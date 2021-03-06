const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// handles urls beginning with /api/actions

const descriptionLimiter = (req, res, next) => {
  if (req.body.description && req.body.description.length > 128) {
    return res.status(400).json({ message: 'Discription length should be shorter than 128 characters' });
  }

  next();
};

router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The actions information could not be retrieved.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);

    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: 'The action with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The action information could not be retrieved.'
    });
  }
});

router.post('/', descriptionLimiter, async (req, res) => {
  try {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      return res.status(400).json({
        errorMessage: 'Please provide a project_id, notes, and description value for action'
      });
    }
    const action = await Actions.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the action to the database'
    });
  }
});

router.put('/:id', descriptionLimiter, async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes ) {
    return res
      .status(400)
      .json({
        errorMessage: 'Please provide project_id, description, notes for the action.'
      });
  }
  try {
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ error: 'The action with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The action information could not be modified.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maybeAction = await Actions.get(req.params.id);
    if (maybeAction) {
      await Actions.remove(req.params.id);
      return res.status(200).json(maybeAction);
    } else {
      return res
        .status(404)
        .json({ message: 'The action with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action'
    });
  }
});

module.exports = router;



const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// handles urls beginning with /api/projects

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The projects information could not be retrieved.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: 'The project with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The project information could not be retrieved.'
    });
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);

    if (actions) {
      res.status(200).json(actions);
    } else {
      res
        .status(404)
        .json({ message: 'The project with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The project information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.user_id || !req.body.text) {
      return res.status(400).json({
        errorMessage: 'Please provide a user_id and text value for project'
      });
    }
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the project to the database'
    });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.user_id || !req.body.text) {
    return res
      .status(400)
      .json({
        errorMessage: 'Please provide user_id and text for the project.'
      });
  }
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ error: 'The project with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The project information could not be modified.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const maybeProject = await Projects.get(req.params.id);
    if (maybeProject) {
      await Projects.remove(req.params.id);
      return res.status(200).json(maybeProject);
    } else {
      return res
        .status(404)
        .json({ message: 'The project with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project'
    });
  }
});

module.exports = router;


import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProjectActions } from '../actions';

const ProjectDiv = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
`;

const Name = styled.div`
  font-size: 18px;
`;

const Project = props => {
  const [showActions, setShowActions] = useState(false);
  const { name, actions, id } = props.project;
  return (
    <ProjectDiv>
      <Name
        onClick={() => {
          if (showActions) {
            setShowActions(false);
          } else {
            props.fetchActions(id).then(() => setShowActions(true));
          }
        }}
      >
        {name}
      </Name>
      { props.fetchingActions && <div>fetching...</div> }
      {showActions &&
        actions.map(action => <div key={action.id}>{action.description}</div>)}
    </ProjectDiv>
  );
};

const mapStateToProps = (state, ownProps) => ({
  project: state.projects.projects.find(p => p.id === ownProps.project_id),
  fetchingActions: state.projects.fetchingProjectActions
});

export default connect(mapStateToProps, {
  fetchProjectActions
})(Project);

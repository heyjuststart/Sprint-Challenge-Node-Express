import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProjects, fetchProjectActions } from '../actions';
import Project from '../components/Project';

const ProjectList = styled.div`
  border: 1px solid black;
  padding: 20px;
`;

const Projects = props => {
  useEffect(() => {
    props.fetchProjects();
  }, []);
  return (
    <ProjectList>
      {props.projects.map(project => (
        <Project
          fetchActions={props.fetchProjectActions}
          key={project.id}
          project_id={project.id}
        />
      ))}
    </ProjectList>
  );
};

const mapStateToProps = (state, _ownProps) => ({
  projects: state.projects.projects
});

export default connect(
  mapStateToProps,
  {
    fetchProjects,
    fetchProjectActions
  }
)(Projects);

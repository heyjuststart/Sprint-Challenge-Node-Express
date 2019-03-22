import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions';

const ProjectList = styled.div`
`;

const Projects = (props) => {
  useEffect(() => {
    props.fetchProjects();
  }, []);
  return (
    <ProjectList>
      { props.projects.map(project => <div>{project.name}</div>) }
    </ProjectList>
  );
};

const mapStateToProps = (state, _ownProps) => ({
  projects: state.projects.projects
});

export default connect(mapStateToProps, {
  fetchProjects
})(Projects);

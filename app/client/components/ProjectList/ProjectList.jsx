import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-client-preset';
import Project from '../Project';

const ProjectList = props => (
  <div>
    {!props.allProjectsQuery.loading &&
      props.allProjectsQuery.allProjects.map(project => (
        <Project key={project.id} title={project.title} />
      ))}
  </div>
);

const ALL_PROJECTS = gql`
  {
    allProjects {
      id
      title
    }
  }
`;

export default graphql(ALL_PROJECTS, { name: 'allProjectsQuery' })(ProjectList);

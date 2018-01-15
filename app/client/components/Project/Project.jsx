import React from 'react';
import { string } from 'prop-types';

const Project = ({ title }) => <div>{title}</div>;

Project.propTypes = {
  title: string().isRequired
};

export default Project;

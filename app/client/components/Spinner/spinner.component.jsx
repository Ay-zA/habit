import React from 'react';
import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000022;
`
const Spinner = props => <Mask>Spining</Mask>;

export default Spinner;

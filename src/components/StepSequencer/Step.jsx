import React, { useState } from "react";
import styled from "styled-components";

const StepButton = styled.button`
  flex: 1;
  border-radius: 2;
  height: 100%;
  background-color: red;
  opacity: ${(props) => (props.on ? 1 : 0.35)};
`;

export const Step = ({ on, onClick }) => {
  return <StepButton on={on} onClick={onClick} />;
};

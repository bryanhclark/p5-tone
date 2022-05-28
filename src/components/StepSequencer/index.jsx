import styled, { css } from "styled-components";
import { Tracks } from "./Tracks";
import StepContext from "./StepContext";
import { useToneContext } from "../../contexts/tone-context";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #555;
  margin: 0px 20px 20px;
  position: relative;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0px;
  right: 0px;
  height: 100%;
  padding: 4px 2px;
  pointer-events: none;
`;

const StepIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: calc(
    ${(props) => props.currentStep} * calc(calc(100% - 150px) / 16) + 150px
  );
  height: 100%;
  background: #00ff0020;
  width: calc(calc(100% - 150px) / 16);
`;

export const StepSequencer = ({ config }) => {
  const { state: toneState } = useToneContext();

  return (
    <StepContext.Provider value={{ ...config }}>
      <Container>
        <IndicatorWrapper>
          <StepIndicator currentStep={toneState.currentStep} />
        </IndicatorWrapper>
        <Tracks />
      </Container>
    </StepContext.Provider>
  );
};

import { useState } from "react";
import styled from "styled-components";
import { StepSequencer } from "./StepSequencer";
import { useToneContext } from "../contexts/tone-context";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const ButtonContainer = styled.div`
  margin-bottom: 15px;
`;

const createBeats = (beats = 16) => new Array(beats).fill(0);

const INITIAL_TRACKS = ["hi-hat", "snare", "kick", "clap"];
const INITIAL_TRACKS_2 = ["synth1", "synth2", "synth3", "synth4"];

const generateInitialState = (tracks) => {
  const state = {};
  tracks.forEach((track) => {
    state[track] = createBeats();
  });
  return state;
};

export const DrumMachine = () => {
  const { state, dispatch } = useToneContext();
  const [state1, setState1] = useState(generateInitialState(INITIAL_TRACKS));
  const [state2, setState2] = useState(generateInitialState(INITIAL_TRACKS_2));
  const togglePlay = () => {
    const { playing } = state;
    playing ? dispatch({ type: "stop" }) : dispatch({ type: "start" });
  };
  return (
    <Container>
      <ButtonContainer>
        <button onClick={togglePlay}>Start</button>
      </ButtonContainer>
      <StepSequencer config={{ value: state1, setValue: setState1 }} />
      <hr />
      <StepSequencer config={{ value: state2, setValue: setState2 }} />
    </Container>
  );
};

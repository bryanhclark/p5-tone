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
const C_MAJOR = ["C3", "D3", "E3", "F3", "G3", "A3", "B3"];

const INITIAL_TRACKS = [...C_MAJOR];
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
  // const [state2, setState2] = useState(generateInitialState(INITIAL_TRACKS_2));
  const { initTone, playing } = state;
  const togglePlay = () => {
    playing ? dispatch({ type: "stop" }) : dispatch({ type: "start" });
  };
  const handleInitTone = () => {
    dispatch({ type: "initTone" });
  };

  const handleSetBPM = (bpm) => () => {
    dispatch({ type: "setBPM", bpm });
  };
  return (
    <Container>
      <ButtonContainer>
        {!initTone && <button onClick={handleInitTone}>Init</button>}
        <button onClick={togglePlay}>Start</button>
      </ButtonContainer>
      <ButtonContainer>
        <button onClick={handleSetBPM(60)}>BPM: 60</button>
        <button onClick={handleSetBPM(100)}>BPM: 100</button>
        <button onClick={handleSetBPM(140)}>BPM: 140</button>
      </ButtonContainer>
      <StepSequencer config={{ value: state1, setValue: setState1 }} />
      <hr />
    </Container>
  );
};

import { useEffect } from "react";
import styled, { css } from "styled-components";
import { Tracks } from "./Tracks";
import StepContext from "./StepContext";
import { useToneContext } from "../../contexts/tone-context";
import * as Tone from "tone";
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

const getNotesToPlay = (currentStep, noteValues) => {
  const notes = Object.keys(noteValues);
  const notesToPlay = [];
  notes.forEach((note) => {
    if (noteValues[note][currentStep]) notesToPlay.push(note);
  });
  return notesToPlay;
};

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
polySynth.volume.value = -10;

export const StepSequencer = ({ config }) => {
  // TODO: toneState is just global values
  const { state: toneState, dispatch } = useToneContext();
  const { currentStep, playing, initTone, currentScheduleId } = toneState;

  // TODO: config prop has the state of the sequencer
  const { value } = config;
  // useEffect(() => {
  //   // THIS FUCKING SUCKS
  //   if (playing) {
  //     const notesToPlay = getNotesToPlay(currentStep, value);
  //     polySynth.triggerAttackRelease(notesToPlay, "16n");
  //   }
  // }, [currentStep, polySynth, value]);
  useEffect(() => {
    if (currentScheduleId === null && initTone) {
      const scheduleId = Tone.Transport.scheduleRepeat((val) => {
        // THIS IS WHERE WE WANT TO TRIGGER EVERYTHING
        const notesToPlay = getNotesToPlay(currentStep, value);
        polySynth.triggerAttackRelease(notesToPlay, "16n");
        dispatch({ type: "increment_step" });
      }, "16n");
      dispatch({ type: "set_schedle_id", scheduleId });
    }
  }, [currentScheduleId, initTone, dispatch]);

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

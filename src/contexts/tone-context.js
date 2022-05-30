import { createContext, useReducer, useContext, useEffect } from "react";
import * as Tone from "tone";
import useOscillator from "../hooks/useOscillator";

const ToneContext = createContext();

const INITIAL_STATE = {
  initTone: false,
  playing: false,
  numSteps: 16,
  currentStep: 0,
  bpm: 65,
  currentScheduleId: null,
};

function toneReducer(state, action) {
  switch (action.type) {
    case "initTone":
      return {
        ...state,
        initTone: true,
      };
    case "set_schedle_id":
      return {
        ...state,
        currentScheduleId: action.scheduleId,
      };
    case "setBPM":
      return {
        ...state,
        bpm: action.bpm,
      };
    case "start":
      return {
        ...state,
        playing: true,
      };
    case "stop":
      return {
        ...state,
        playing: false,
      };
    case "increment_step":
      const newStep = (state.currentStep + 1) % state.numSteps;
      return {
        ...state,
        currentStep: newStep,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const handleInitTone = async () => {
  await Tone.start();
};

const ToneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toneReducer, { ...INITIAL_STATE });
  const { currentScheduleId, bpm, initTone } = state;
  const { playing } = state;
  // init Tone repeat
  useEffect(() => {
    if (initTone) {
      handleInitTone();
    }
  }, [initTone]);

  // SHOULD THIS BE PER INSTRUMENT?
  // useEffect(() => {
  //   if (currentScheduleId === null && initTone) {
  //     const scheduleId = Tone.Transport.scheduleRepeat((val) => {
  //       // THIS IS WHERE WE WANT TO TRIGGER EVERYTHING
  //       dispatch({ type: "increment_step" });
  //     }, "16n");
  //     dispatch({ type: "set_schedle_id", scheduleId });
  //   }
  // }, [currentScheduleId, initTone]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // start/stop tone repeat
  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [playing]);

  const toneProviderValue = { state, dispatch };
  return (
    <ToneContext.Provider value={toneProviderValue}>
      {children}
    </ToneContext.Provider>
  );
};

const useToneContext = () => {
  const context = useContext(ToneContext);
  if (context === undefined) {
    throw new Error("useToneContext must be used within a ToneProvider");
  }
  return context;
};

export { ToneProvider, useToneContext };

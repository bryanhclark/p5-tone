import { createContext, useReducer, useContext } from "react";

const ToneContext = createContext();

const INITIAL_STATE = {
  playing: false,
  numSteps: 16,
  currentStep: 0,
};

function toneReducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        playing: true,
        currentStep: (state.currentStep + 1) % state.numSteps,
      };
    case "stop":
      return {
        ...state,
        playing: false,
      };
    case "increment_step":
      return {
        ...state,
        currentStep: (state.currentStep + 1) % state.numSteps,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const ToneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toneReducer, { ...INITIAL_STATE });
  const value = { state, dispatch };
  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>;
};

const useToneContext = () => {
  const context = useContext(ToneContext);
  if (context === undefined) {
    throw new Error("useToneContext must be used within a ToneProvider");
  }
  return context;
};

export { ToneProvider, useToneContext };

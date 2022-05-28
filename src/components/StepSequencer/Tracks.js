import { useContext } from "react";
import StepContext from "./StepContext";
import { Track } from "./Track";

export const Tracks = () => {
  const context = useContext(StepContext);
  const { value } = context;
  const trackNames = Object.keys(value);

  return trackNames.map((name) => {
    const steps = value[name];
    return (
      <div>
        <Track name={name} steps={steps} />
      </div>
    );
  });
};

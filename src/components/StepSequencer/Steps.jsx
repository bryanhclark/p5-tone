import { useContext } from "react";
import { Flex } from "../styled";
import { Step } from "./Step";
import StepContext from "./StepContext";

export const Steps = ({ steps, name }) => {
  const { value, setValue } = useContext(StepContext);
  const toggleStep = (name, stepIndex) => () => {
    console.log(name);
    const origSteps = value[name];
    const newSteps = [...origSteps];
    newSteps[stepIndex] = origSteps[stepIndex] ? 0 : 1;
    setValue({
      ...value,
      [name]: newSteps,
    });
  };
  return (
    <Flex>
      {steps.map((step, idx) => (
        <Step on={step} onClick={toggleStep(name, idx)} />
      ))}
    </Flex>
  );
};

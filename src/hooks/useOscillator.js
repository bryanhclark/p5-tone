import { Oscillator } from "tone";
export default function useOscillator() {
  const osc = new Oscillator(440, "sine");
  return osc;
}

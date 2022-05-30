import * as Tone from "tone";
export default function usePolySynth() {
  return new Tone.PolySynth(Tone.Synth).toDestination();
}

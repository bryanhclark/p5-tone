import styled from "styled-components";
import { DrumMachine } from "./components/DrumMachine";
import { FlexCenterFullHeightWidth } from "./components/styled";
import { ToneProvider } from "./contexts/tone-context";

const Container = styled(FlexCenterFullHeightWidth)``;

export default function App() {
  return (
    <Container>
      <ToneProvider>
        <DrumMachine />
      </ToneProvider>
    </Container>
  );
}

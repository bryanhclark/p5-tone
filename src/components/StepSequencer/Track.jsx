import styled from "styled-components";
import { Steps } from "./Steps";
import { Flex } from "../styled";

const TrackInfo = styled.div`
  width: 150px;
  border: 1px solid #555;
`;

const TrackName = styled.h2`
  margin: 0;
`;

export const Track = ({ name, steps }) => {
  return (
    <Flex>
      <TrackInfo>
        <TrackName>{name}</TrackName>
      </TrackInfo>
      <Steps name={name} steps={steps} />
    </Flex>
  );
};

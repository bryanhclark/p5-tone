import styled, { css } from "styled-components";

const FULL_HEIGHT = css`
  height: 100%;
`;
const FULL_WIDTH = css`
  width: 100%;
`;

export const FullHeight = styled.div`
  ${FULL_HEIGHT}
`;

export const FullWidth = styled.div`
  ${FULL_WIDTH}
`;

export const FullHeightWidth = styled.div`
  ${FULL_HEIGHT}
  ${FULL_WIDTH}
`;

export const Flex = styled.div`
  flex: 1;
  display: flex;
`;

export const FlexCol = styled(Flex)`
  flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColCenter = styled(FlexCol)`
  justify-content: center;
  align-items: center;
`;

export const FlexCenterFullHeightWidth = styled(FlexCenter)`
  height: 100%;
  width: 100%;
`;

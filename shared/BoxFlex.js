import styled from '@emotion/styled';
import {
  space,
  width,
  height,
  position,
  top,
  gridRow,
  gridColumn,
  flex,
  display,
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  color,
  background,
  backgroundRepeat,
  maxWidth,
  borders,
  borderColor,
  zIndex,
} from 'styled-system';

const FlexBox = styled.div(
  space,
  maxWidth,
  height,
  display,
  flexDirection,
  alignSelf,
  justifyContent,
  alignItems,
  flex,
  gridRow,
  gridColumn,
  color,
  background,
  backgroundRepeat,
  position,
  top,
  borders,
  borderColor,
  zIndex
);

FlexBox.defaultProps = {
  display: 'flex',
};

export default FlexBox;

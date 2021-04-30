import styled from '@emotion/styled';
import {
  space,
  width,
  height,
  display,
  flex,
  alignSelf,
  maxWidth,
  minHeight,
  maxHeight,
  background,
  backgroundRepeat,
  backgroundSize,
  backgroundPosition,
  color,
  gridRow,
  gridColumn,
  position,
  left,
  top,
  right,
  bottom,
  overflow,
} from 'styled-system';

const Box = styled.div(
  space,
  width,
  display,
  height,
  left,
  gridRow,
  gridColumn,
  flex,
  alignSelf,
  maxWidth,
  minHeight,
  maxHeight,
  color,
  background,
  backgroundRepeat,
  backgroundSize,
  backgroundPosition,
  position,
  left,
  top,
  right,
  bottom,
  overflow
);

Box.propTypes = {
  ...space.propTypes,
  ...flex.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
  ...minHeight.propTypes,
  ...color.propTypes,
};

export default Box;

import styled from '@emotion/styled';
import {
  space,
  width,
  height,
  maxWidth,
  maxHeight,
  borders,
  borderColor,
} from 'styled-system';

const Iframe = styled.iframe(
  space,
  width,
  height,
  maxWidth,
  maxHeight,
  borders,
  borderColor
);

Iframe.defaultProps = {
  border: 'none',
  mt: 2,
  mb: 6,
};

export default Iframe;

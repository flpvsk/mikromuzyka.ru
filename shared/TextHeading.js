import styled from '@emotion/styled';
import {
  space,
  display,
  textAlign,
  textStyle,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  background,
  zIndex,
  maxWidth,
} from 'styled-system';

const Heading = styled.h1(
  space,
  display,
  textStyle,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  textAlign,
  background,
  zIndex,
  maxWidth
);

Heading.defaultProps = {
  color: 'black',
  m: 0,
};

export default Heading;

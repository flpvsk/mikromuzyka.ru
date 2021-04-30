import React from 'react';
import styled from '@emotion/styled';

import {
  textStyle,
  textAlign,
  fontSize,
  fontStyle,
  fontWeight,
  color,
  space,
} from 'styled-system';

const P = styled.p(
  textStyle,
  textAlign,
  fontSize,
  fontStyle,
  fontWeight,
  color,
  space
);

const fontSizes = {
  small: [0, 1, 2],
  normal: [1, 2, 3],
};

function TextBody(props) {
  const fontSize = fontSizes[props.size];
  return <P {...props} fontSize={fontSize} textStyle={'body'} />;
}

TextBody.defaultProps = {
  size: 'normal',
  color: 'blacks.0',
  m: 0,
};

export default TextBody;

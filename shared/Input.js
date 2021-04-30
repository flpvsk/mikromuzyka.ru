import styled from '@emotion/styled';

import {
  space,
  width,
  maxWidth,
  textStyle,
  color,
  fontSize,
  border,
  borderColor,
  flex,
} from 'styled-system';

const Input = styled.input(
  space,
  width,
  maxWidth,
  textStyle,
  color,
  fontSize,
  border,
  borderColor,
  flex
);

Input.defaultProps = {
  pr: 1,
  pl: 1,
  pb: '4px',
  pt: '4px',
  textStyle: 'caption',
  fontSize: [2],
  color: 'blacks.0',
  border: '1px solid',
  borderColor: 'blacks.2',
  flex: 1,
  maxWidth: '15em',
};

export default Input;

import styled from '@emotion/styled';
import {
  space,
  width,
  textStyle,
  fontSize,
  color,
  border,
  background,
  boxShadow,
  alignSelf,
  justifySelf,
} from 'styled-system';

const Button = styled.button(
  {
    cursor: 'pointer',
  },
  space,
  width,
  textStyle,
  fontSize,
  color,
  border,
  background,
  boxShadow,
  alignSelf,
  justifySelf
);

Button.defaultProps = {
  pr: 1,
  pl: 1,
  pb: '4px',
  pt: '4px',
  textStyle: 'caption',
  fontSize: [2],
  border: 'none',
  background: 'black',
  color: 'white',
  boxShadow: 'button',
};

export default Button;

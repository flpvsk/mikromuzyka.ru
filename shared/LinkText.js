import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { fontSize, color } from 'styled-system';

const LinkText = styled.a(
  props => css`
    cursor: pointer;
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(
      to right,
      ${props.color} 100%,
      ${props.color} 0
    );
    background-image: linear-gradient(
      to right,
      currentColor 100%,
      currentColor 0
    );
    background-size: 1px 1px;
    background-position: 0 1.05em;
    background-position: 0 calc(1em + 1px);
  `,
  fontSize,
  color
);

LinkText.defaultProps = {
  color: 'blacks.0',
};

export default LinkText;

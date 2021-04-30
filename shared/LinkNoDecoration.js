import styled from '@emotion/styled';

import {
  fontSize,
  color,
  textStyle,
  space,
  display,
  alignItems,
} from 'styled-system';

const A = styled.a(
  {
    textDecoration: 'none',
  },
  space,
  fontSize,
  textStyle,
  color,
  display,
  alignItems
);

export default A;

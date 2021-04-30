import React from 'react';
import styled from '@emotion/styled';
import Svg from './Svg';
import { withTheme } from 'emotion-theming';

import { themeGet } from 'styled-system';

const TITLE = 'Website logo';

const DESCRIPTION =
  `Two equilateral triangles of different size and different color ` +
  `nested within one another. ` +
  `Bottom sides of both are aligned.`;

function Logo(props) {
  const { outerColor, innerColor, size, display } = props;

  return (
    <Svg
      width={size}
      height={size}
      display={display}
      viewBox='0 0 80 80'
    >
      <title>{TITLE}</title>
      <description>{DESCRIPTION}</description>
      <polygon
        className='logo__outer'
        fill={themeGet(`colors.${outerColor}`, outerColor)(props)}
        points='0 80 80 80 40 0'
      />
      <polygon
        className='logo__inner'
        fill={themeGet(`colors.${innerColor}`, innerColor)(props)}
        points='20 80 60 80 40 40'
      />
    </Svg>
  );
}

export default withTheme(Logo);

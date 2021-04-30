import React from 'react';
import Svg from './Svg';
import { withTheme } from 'emotion-theming';

import { themeGet } from 'styled-system';

function Logo(props) {
  const { outerColor, innerColor, size, display } = props;

  return (
    <Svg
      width={size}
      height={size}
      display={display}
      viewBox='0 0 80 80'
    >
      <polygon
        className='logo__outer'
        fill={themeGet(`colors.${outerColor}`, outerColor)(props)}
        points='0 80 80 80 80 0 0 0'
      />
      <polygon
        className='logo__inner'
        fill={themeGet(`colors.${innerColor}`, innerColor)(props)}
        points='20 0 40 60 60 0'
      />
    </Svg>
  );
}

export default withTheme(Logo);

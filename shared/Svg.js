import React from 'react';
import styled from '@emotion/styled';
import tag from 'clean-tag';
import { space, width, height, display, style } from 'styled-system';

const fill = style({
  prop: 'color',
  cssProperty: 'fill',
  key: 'colors',
});

const Svg = styled(tag.svg)(space, width, height, display, fill);

Svg.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
};

export default Svg;

import styled from '@emotion/styled';
import {
  display,
  space,
  width,
  textAlign,
  textStyle,
  fontSize,
  color,
} from 'styled-system';

const Caption = styled.div`
  ${display}
  ${space}
  ${width}
  ${textAlign}
  ${textStyle}
  ${fontSize}
  ${color}
`;

Caption.defaultProps = {
  textStyle: 'caption',
  fontSize: [0, 1],
};

export default Caption;

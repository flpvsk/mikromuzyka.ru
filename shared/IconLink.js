import React from 'react';
import styled from '@emotion/styled';
import { width, height, space, display } from 'styled-system';

const LinkIcon = styled.a(space, width, height, display);

LinkIcon.defaultProps = {
  display: 'inline-block',
};

export default LinkIcon;

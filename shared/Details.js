import styled from '@emotion/styled';
import { space, color } from 'styled-system';

import TextBody from './TextBody';
import Caption from './Caption';

const DetailsElement = styled.details(space, color, {
  '& > *': {
    marginTop: 8,
  },

  '& > summary': {
    marginTop: 0,
    marginLeft: 0,
    cursor: 'pointer',
  },
});

export default function Details({ summary, children }) {
  return (
    <DetailsElement
      p={1}
      ml={-1}
      mr={-1}
      mt={3}
      mb={3}
      color='blacks.0'
    >
      <Caption as='summary'>{summary}</Caption>
      {children}
    </DetailsElement>
  );
}

import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import TextItemBody from '../shared/TextItemBody';
import LinkText from '../shared/LinkText';
import LinkExternal from '../shared/LinkExternal';

import Box from '../shared/Box';

const components = {
  p: TextItemBody,
  a: props => {
    const { href } = props;

    if (!href || href.indexOf(':') === '-1') {
      return <LinkText colors='' {...props} />;
    }

    return <LinkExternal {...props} />;
  },
};

export default function HeroText({ mb, children }) {
  return (
    <MDXProvider components={components}>
      <Box mb={mb} maxWidth={'43rem'}>
        {children}
      </Box>
    </MDXProvider>
  );
}

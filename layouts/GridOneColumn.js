import { MDXProvider } from '@mdx-js/react';

import Box from '../shared/Box';
import BoxGrid from '../shared/BoxGrid';
import components from '../shared/mdxComponentsMain';

export default function GridOneColumn({ children }) {
  return (
    <MDXProvider components={components}>
      <BoxGrid gridTemplateRows='auto' gridTemplateColumns={['1fr']}>
        {children.props.children}
      </BoxGrid>
    </MDXProvider>
  );
}

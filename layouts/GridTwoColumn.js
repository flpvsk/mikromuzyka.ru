import { MDXProvider } from '@mdx-js/react';

import BoxGrid from '../shared/BoxGrid';
import components from '../shared/mdxComponentsMain';

export default function GridTwoColumn({ children }) {
  return (
    <MDXProvider components={components}>
      <BoxGrid
        gridTemplateRows='auto'
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        gridColumnGap={[5, 5, 8, 8]}
        gridRowGap={[0, 0, 1, 1]}
      >
        {children}
      </BoxGrid>
    </MDXProvider>
  );
}

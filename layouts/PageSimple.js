import Head from 'next/head';

import { MDXProvider } from '@mdx-js/react';
import components from '~/shared/mdxComponentsBlog';

import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';

import TextHeading from '~/shared/TextHeading';

import Menu from '~/shared/Menu';
import Footer from '~/shared/Footer';

import siteInfo from '~/siteInfo';

export default function PageSimple({
  children,
  title,
  heading,
  currentMenuItemId,
}) {
  return (
    <BoxGrid
      minHeight={'100vh'}
      gridTemplateColumns={'100vw'}
      gridTemplateRows={'auto'}
    >
      <Head>
        <title>{`${title} – ${siteInfo.siteName}`}</title>
      </Head>
      <Menu currentItemId={currentMenuItemId} />

      <Box
        as='article'
        maxWidth={'45em'}
        ml='auto'
        mr='auto'
        pl={[2, 3, 4]}
        pr={[2, 3, 4]}
        pb={[3, 4, 5]}
      >
        <header>
          <TextHeading
            as='h1'
            textStyle='h2'
            fontSize={[6, 7, 8]}
            color='black'
            mt={[4, 5, 6]}
            textAlign='center'
          >
            {heading || title}
          </TextHeading>
        </header>

        <Box mt={[7, 8, 9]}>
          <MDXProvider components={components}>{children}</MDXProvider>
        </Box>
      </Box>
      <Footer />
    </BoxGrid>
  );
}

export function makeSimplePage(meta) {
  return function SimplePageWrapper(props) {
    return <PageSimple {...meta} {...props} />;
  };
}

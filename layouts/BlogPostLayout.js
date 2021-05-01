import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';

import MetaArticle from '~/shared/MetaArticle';

import Box from '../shared/Box';
import BoxFlex from '../shared/BoxFlex';

import Logo from '../shared/Logo';
import Menu from '~/shared/Menu';
import Footer from '../shared/Footer';

import Caption from '../shared/Caption';
import LinkExternal from '../shared/LinkExternal';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';

import components from '~/shared/mdxComponentsBlog';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import { space, textStyle, fontSize, color } from 'styled-system';

import siteInfo from '../siteInfo';

function dateToText(date) {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function InfoStripe({ author, publishDate }) {
  let dateString = '';
  try {
    let d = dateToText(publishDate);
    dateString = `/ ${d}`;
  } catch (e) {
    // no valid date
  }

  return (
    <BoxFlex
      bg='primary'
      alignItems='center'
      p={1}
      ml={[-2, -3, -4]}
      mr={[-2, -3, -4]}
      mb={4}
    >
      <Caption
        pl={[2, 3, 4]}
        pr={[2, 3, 4]}
        width='100%'
        fontSize={[2, 3]}
        textAlign='center'
      >
        {`${author} ${dateString}`}
      </Caption>
    </BoxFlex>
  );
}

function BlogPostLayout({ meta = {}, theme, children }) {
  const titleText = meta.title || '';
  const headingText = meta.heading || titleText;
  const author = meta.author;

  return (
    <MDXProvider components={components}>
      <>
        <MetaArticle {...meta} />
        <Menu />
        <Box
          as='article'
          ml={[2, 3, 4]}
          mr={[2, 3, 4]}
          mt={[4, 5, 6]}
          pb={5}
        >
          <Box as='header' w='100%'>
            <Box
              ml={[1, 2, 3, 4]}
              mr={[1, 2, 3, 4]}
            >
              <TextHeading
                as='h1'
                fontSize={[4, 6, 6, 8]}
                textStyle='h2'
                textAlign='center'
                mt={0}
                mb={4}
                color='black'
              >
                {headingText}
              </TextHeading>
            </Box>

            <InfoStripe {...meta} />
          </Box>

          <Box maxWidth={'45em'} ml='auto' mr='auto'>
            {children}
          </Box>
        </Box>
        <Footer />
      </>
    </MDXProvider>
  );
}

const BlogPostLayoutWithTheme = withTheme(BlogPostLayout);

export default BlogPostLayoutWithTheme;

export function makeBlogPost(meta) {
  return function makeBlogPostWrapper(props) {
    return <BlogPostLayoutWithTheme meta={meta} {...props} />;
  };
}

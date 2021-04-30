import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import styled from '@emotion/styled';

import LinkExternalNoDecoration from '../shared/LinkExternalNoDecoration';
import components from '../shared/mdxComponentsMain';

import Box from '../shared/Box';
import BoxGrid from '../shared/BoxGrid';
import BoxFlex from '../shared/BoxFlex';

import Caption from '../shared/Caption';
import TextItemHeading from '../shared/TextItemHeading';

import SvgPlay from '../shared/SvgPlay';
import SvgLink from '../shared/SvgLink';

const Svgs = {
  play: SvgPlay,
  link: SvgLink,
};

const CompanyLogoImg = styled.img({
  width: '100%',
  maxWidth: '200px',
  maxHeight: '80px',
});

function WorkItem({ id, title, logo, links, children, mb }) {
  const linksMapped = links.map((link, i) => {
    const SvgIcon = Svgs[link.svgName];
    let mr = [2, 3, 0];

    if (i === links.length - 1) {
      mr = [0];
    }

    return (
      <LinkExternalNoDecoration
        key={i}
        mr={mr}
        mb={[0, 0, 1]}
        href={link.href}
      >
        <BoxFlex minHeight={'2rem'} alignItems={'center'}>
          <SvgIcon
            height={'1.8rem'}
            width={'1.8rem'}
            color='blacks.1'
            pt='2px'
            mr={1}
          />
          <Caption as='span' color='blacks.0'>
            {link.text}
          </Caption>
        </BoxFlex>
      </LinkExternalNoDecoration>
    );
  });

  return (
    <MDXProvider components={components}>
      <BoxGrid
        id={id}
        mb={mb}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '7fr minmax(11rem, 2fr)',
          '7fr 4fr',
        ]}
        gridColumnGap={[5, 5, 8, 8]}
        gridTemplateRows={'auto'}
      >
        <Box gridColumn={'1'} gridRow={[2, 2, 1, 1]}>
          <TextItemHeading display={['none', 'none', 'block']}>
            {title}
          </TextItemHeading>

          {children}
        </Box>

        <BoxFlex
          mb={[2, 2, 0, 0]}
          flexDirection={'column'}
          gridColumn={[1, 1, 2, 2]}
          gridRow={[1, 1, 1, 1]}
        >
          <CompanyLogoImg src={logo} alt={`Logo of ${title}`} />

          <BoxFlex
            mt={[1, 1, 3]}
            flexWrap={'wrap'}
            alignItems={['center', 'center', 'flex-start']}
            flexDirection={['row', 'row', 'column']}
          >
            {linksMapped}
          </BoxFlex>
        </BoxFlex>
      </BoxGrid>
    </MDXProvider>
  );
}

export default WorkItem;

export function makeWorkItem({ title, logo, links, ...otherMeta }) {
  return function WorkItemWithData(props) {
    return (
      <WorkItem
        title={title}
        logo={logo}
        links={links}
        {...otherMeta}
        {...props}
      />
    );
  };
}

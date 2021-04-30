import React from 'react';
import styled from '@emotion/styled';

import Caption from './Caption';
import IconLinkTwitter from './IconLinkTwitter';
import IconLinkGithub from './IconLinkGithub';
import IconLinkEmail from './IconLinkEmail';
import LinkExternal from './LinkExternal';
import Input from './Input';
import Button from './Button';

import BoxFlex from './BoxFlex';
import BoxGrid from './BoxGrid';
import noiseBackground from './noiseBackground';

import siteInfo from '../siteInfo';

function TextLicense() {
  return (
    <>
      {`All text licensed under the `}
      <LinkExternal
        color={'black'}
        href='https://creativecommons.org/licenses/by-nc/4.0/'
      >
        Creative Commons Attribution-NonCommercial 4.0 International
        License
      </LinkExternal>
      {`.`}
    </>
  );
}

function SourceCodeLicense() {
  return (
    <>
      <LinkExternal
        color={'black'}
        href='https://github.com/flpvsk/flpvsk.com'
      >
        Source code of the website
      </LinkExternal>
      {` licensed under the `}
      <LinkExternal
        color={'black'}
        href='https://tldrlegal.com/license/mit-license'
      >
        {`MIT License`}
      </LinkExternal>
      {`.`}
    </>
  );
}

const BoxFooter = styled(BoxGrid)(noiseBackground);

export default function Footer() {
  return (
    <BoxFooter
      as='footer'
      w={'100%'}
      pt={2}
      pb={2}
      pr={[2, 3, 4]}
      pl={[2, 3, 4]}
      display='grid'
      borderTop='1px solid'
      borderColor='blacks.1'
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '2fr 1fr 1fr']}
      gridTemplateRows={['auto auto', 'auto auto', '1fr']}
      gridAutoFlow={['row', 'row', 'column']}
      gridRowGap={0}
      gridColumnGap={4}
    >
      <BoxFlex mt={[4, 4, 0]} flexDirection='column'>
        <Caption mb={2}>
          <TextLicense />
        </Caption>
        <Caption mb={[4, 4, 0]}>
          <SourceCodeLicense />
        </Caption>
      </BoxFlex>
      <BoxFlex
        gridRow={[1, 1, 1]}
        flexDirection='column'
        alignItems={['flex-start', 'flex-start', 'flex-start']}
      >
        <form
          style={{ width: '100%', margin: 0 }}
          action='https://tinyletter.com/flpvsk'
          method='post'
          target='popupwindow'
        >
          <Caption
            as='label'
            htmlFor='subscribe-input-footer'
            display='block'
            mb={1}
          >
            Get notified when I publish new posts
          </Caption>
          <BoxFlex>
            <Input
              id='subscribe-input-footer'
              type='email'
              name='email'
              placeholder='Email'
            />
            <input type='hidden' name='embed' value='1' />
            <Button ml={1}>Subscribe</Button>
          </BoxFlex>
        </form>
      </BoxFlex>
      <BoxFlex
        gridRow={[2, 2, 1]}
        mt={[4, 4, 0]}
        flex={[0, 0, 1]}
        alignItems={['flex-start']}
        flexDirection='row'
        justifyContent={['flex-start', 'flex-start', 'flex-end']}
      >
        <IconLinkTwitter height={24} />
        <IconLinkGithub height={24} ml={3} />
        <IconLinkEmail height={24} ml={3} />
      </BoxFlex>
    </BoxFooter>
  );
}

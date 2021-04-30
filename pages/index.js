import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import {
  position,
  right,
  bottom,
  width,
  height,
  maxHeight,
  maxWidth,
} from 'styled-system';

import siteInfo from '~/siteInfo';

import Menu from '~/shared/Menu';
import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';
import BoxFlex from '~/shared/BoxFlex';

import noiseBackground from '~/shared/noiseBackground';

import Meta from '~/shared/Meta';
import PostPreview from '~/shared/PostPreview';
import TextHeading from '~/shared/TextHeading';

import Input from '~/shared/Input';
import Button from '~/shared/Button';

import Footer from '~/shared/Footer';

import HeroText from '~/texts/hero.md';

const Img = styled.img(
  { flex: '0 0 100%' },
  maxWidth,
  maxHeight,
  width,
  height
);

const Picture = styled.picture(
  {
    display: 'flex',
    height: 'auto',
    maxHeight: '100%',
  },
  position,
  bottom,
  right,
  width,
  height
);

function SvgArrow(props) {
  return (
    <svg style={props} viewBox='0 0 200 90'>
      <path d='M0 0 L100 90 L200 0 Z' />
    </svg>
  );
}

function ImgProgressive({
  path = '/static',
  imgName,
  position,
  bottom,
  right,
  ...other
}) {
  return (
    <Picture position={position} bottom={bottom} right={right}>
      <source srcSet={`${path}/${imgName}.webp`} type='image/webp' />
      <Img {...other} src={`${path}/${imgName}.png`} />
    </Picture>
  );
}

const svgRect = color =>
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 300 20"
      width="300"
      height="20">
        <rect x='0' y='0' width='7.5rem' height='20' fill='${color}' />
    </svg>
  `
    .replace(/\n/, '')
    .replace(/\s+/, ' ');

function Hero() {
  return (
    <BoxGrid
      gridTemplateColumns={['1fr', '1fr', '1fr 240px', '40fr 320px']}
      gridTemplateRows={['auto 160px', 'auto 160px', '1fr']}
    >
      <Box alignSelf='center'>
        <TextHeading
          as='h1'
          textStyle='h1'
          mt={[1, 1, 0, 0]}
          mb={[2, 2, 2, 2]}
          fontSize={[7, 7, 8, 8]}
        >
          {siteInfo.siteName}
        </TextHeading>

        <HeroText mb={5} />
      </Box>
    </BoxGrid>
  );
}

const TextSectionHeader = styled(TextHeading)();
TextSectionHeader.defaultProps = {
  as: 'h2',
  textStyle: 'h2',
  mb: 5,
  mt: 7,
  fontSize: [6, 6, 7, 7],
};

function RecentPosts({ theme }) {
  return (
    <BoxGrid
      id='RecentPosts'
      as='section'
      gridTemplateColumns={['1fr', '1fr', '7fr 2fr', '7fr 4fr']}
      gridColumnGap={[5, 5, 8, 8]}
      gridTemplateRows='auto auto'
      gridAutoFlow='column'
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
    >
      <Box gridColumn={`1 / 3`} gridRow={1}>
        <TextSectionHeader>Микро Музыка</TextSectionHeader>
      </Box>

      <Box gridRow={2} gridColumn={1} mb={6}>
        {siteInfo.posts.slice(0, 3).map((post, i) => (
          <PostPreview key={`post-${i}`} {...post} />
        ))}

        <Button as='a' href='/blog'>
          В блог
        </Button>
      </Box>

      <BoxFlex
        gridRow={2}
        gridColumn={2}
        mt={-2}
        justifyContent='center'
        display={['none', 'none', 'flex', 'flex']}
      >
        <Box
          as='form'
          m={0}
          action='https://tinyletter.com/flpvsk'
          method='post'
          target='popupwindow'
        >
          <Box
            pt={2}
            mb={10}
            position='relative'
            backgroundRepeat='no-repeat'
            backgroundSize='19rem 94%'
            backgroundPosition='top -20px'
            background={
              `url(data:image/svg+xml;utf8,` +
              `${escape(svgRect(theme.colors.primary))})`
            }
          >
            <TextHeading
              as='label'
              htmlFor={'subscribe-email-input'}
              textStyle='h3'
              lineHeight={'1em'}
              zIndex={2}
              display={'block'}
              maxWidth={'4em'}
              fontSize={[6, 6, 7, 7]}
            >
              Get notified when I publish new posts
            </TextHeading>
            <SvgArrow
              position='absolute'
              left='-2.8rem'
              bottom='-4.4rem'
              height='6rem'
              zIndex={-1}
              fill={theme.colors.primary}
            />
          </Box>
          <BoxFlex flexDirection='column'>
            <Input
              id='subscribe-email-input'
              name='email'
              mb={1}
              width={`100%`}
              placeholder='Email'
              type='email'
            />
            <input type='hidden' name='embed' value='1' />
            <Button alignSelf='flex-end'>Subscribe</Button>
          </BoxFlex>
        </Box>
      </BoxFlex>
    </BoxGrid>
  );
}

const Home = withTheme(({ theme }) => {
  return (
    <BoxGrid
      gridTemplateRows={['auto']}
      gridTemplateColumns={['1fr']}
    >
      <Meta />

      <Menu isSticky currentItemId='main' />

      <RecentPosts theme={theme} />

      <Footer />
    </BoxGrid>
  );
});

export default Home;

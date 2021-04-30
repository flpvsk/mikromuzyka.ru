import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Caption from '../shared/Caption';
import LinkExternal from '../shared/LinkExternal';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';
import Separator from '~/shared/Separator';

import Box from '~/shared/Box';
import BoxFlex from '~/shared/BoxFlex';

import {
  space,
  width,
  maxWidth,
  textStyle,
  fontSize,
  color,
  borders,
  borderColor,
} from 'styled-system';

const Code = styled.code(fontSize, textStyle, color);

const ListItem = styled.li(
  css`
    ul > & {
      list-style: none;
      list-style-image: none;

      ::before {
        padding-right: 15px;
        font-size: 18px;
        content: '•';
      }
    }
  `,
  fontSize,
  textStyle,
  color,
  space
);

const UnorderedList = styled.ul(space);

const Blockquote = styled.blockquote(
  {
    fontStyle: 'italic',
  },
  textStyle,
  space,
  borders,
  borderColor
);

Blockquote.defaultProps = {
  textStyle: 'blockquote',
  m: 0,
  ml: -2,
  mt: 2,
  mb: 3,
  pl: 2,
  pt: 1,
  pb: 1,
  borderLeft: `4px solid`,
  borderColor: 'blacks.2',
};

const TextArticleBody = styled(TextBody)({
  marginTop: 0,
  '& + &': {
    marginTop: '24px',
  },
});

const Img = styled.img(space, width, maxWidth);

Img.defaultProps = {
  maxWidth: '100%',
};

const Hr = styled.hr(space, color, borders, borderColor);

Hr.defaultProps = {
  mt: 3,
  mb: 5,
  mr: ['4%', '4%', '8%'],
  ml: ['4%', '4%', '8%'],
  border: 'none',
  borderColor: 'black',
  borderBottom: '1px solid',
};

function propsToId(props) {
  const { children } = props;

  if (children && typeof children === 'string') {
    return children.replace(/[\n|\s]/g, '');
  }

  return null;
}

const components = {
  h1: props => {
    return null;
  },

  h2: props => {
    return (
      <TextHeading
        as='h2'
        id={propsToId(props)}
        fontSize={[4, 5, 6]}
        textStyle='h4'
        color='blacks.0'
        mt={6}
        mb={1}
      >
        {props.children}
      </TextHeading>
    );
  },

  h3: props => (
    <TextHeading
      as='h3'
      id={propsToId(props)}
      fontSize={[3, 4, 5]}
      textStyle='h4'
      color='blacks.0'
      mt={6}
      mb={1}
    >
      {props.children}
    </TextHeading>
  ),

  h4: props => (
    <TextHeading
      as='h4'
      id={propsToId(props)}
      textStyle='h4'
      color='blacks.1'
      fontWeight='bold'
      fontSize={[1, 2, 3]}
      mt={3}
      mb={0}
    >
      {props.children}
    </TextHeading>
  ),

  p: props => {
    const { children } = props;
    if (!(children instanceof Array)) {
      if (children.props && children.props.name === 'img') {
        return children;
      }
    }
    return <TextArticleBody {...props} mt={0} />;
  },

  strong: props => {
    return (
      <TextBody
        as='strong'
        color='blacks.1'
        fontWeight='bold'
        {...props}
      />
    );
  },

  a: props => <LinkExternal {...props} color={'secondaryDark'} />,

  ul: props => <UnorderedList {...props} pl={'4px'} ml={0} mb={2} />,

  li: props => (
    <ListItem
      {...props}
      fontSize={[1, 2, 3]}
      textStyle='body'
      pb={2}
      color='blacks.0'
    />
  ),

  blockquote: props => <Blockquote {...props} fontSize={[1, 2, 3]} />,

  pre: props => (
    <Box
      as='pre'
      p={1}
      ml={-1}
      mr={-1}
      bg={'codeBg'}
      {...props}
      overflow='scroll'
    />
  ),

  code: props => <Code {...props} textStyle='code' color={'black'} />,

  inlineCode: props => (
    <Code
      {...props}
      bg={'codeBg'}
      fontSize={'0.93em'}
      color={'black'}
      textStyle='code'
    />
  ),

  img: props => {
    let figCaption;
    let media;

    if (/\.mp4$/.test(props.src)) {
      media = (
        <Img as='video' controls loop mb={1} alt={props.alt}>
          <source src={props.src} type='video/mp4' />
        </Img>
      );
    } else {
      media = <Img mb={1} src={props.src} alt={props.alt} />;
    }

    if (props.alt) {
      figCaption = (
        <Caption
          as={'figcaption'}
          bg={'black'}
          color={'white'}
          textAlign='center'
          pt={'4px'}
          pb={'4px'}
          pr={1}
          pl={1}
        >
          {props.alt}
        </Caption>
      );
    }

    return (
      <BoxFlex
        as='figure'
        flexDirection='column'
        alignItems='center'
        m={0}
        mt={4}
        mb={4}
      >
        {media}
        {figCaption}
      </BoxFlex>
    );
  },

  hr: props => <Hr />,
};

export default components;

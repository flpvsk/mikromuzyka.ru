import Link from 'next/link';
import styled from '@emotion/styled';

import BoxFlex from '~/shared/BoxFlex';
import LinkNoDecoration from '~/shared/LinkNoDecoration';

import Logo from '~/shared/Logo';

export const menuItems = [
  {
    id: 'main',
    title: 'Главная',
    href: '/',
  },

  {
    id: 'blog',
    title: 'Блог',
    href: '/blog',
  },

  {
    id: 'about',
    title: 'О проекте',
    href: '/about',
  },
  /*
  {
    id: 'influences',
    title: 'Influences',
    href: '/influences',
  },
  */
  /*
  {
    id: 'music',
    title: 'Music',
    href: '/music',
  },
*/
];

const MenuItem = styled(BoxFlex)(props => {
  const { white, black } = props.theme.colors;
  const { isSelected } = props;
  return {
    backgroundColor: isSelected ? black : 'transparent',
    color: isSelected ? white : black,

    '&:hover': {
      backgroundColor: props.theme.colors.black,
      color: props.theme.colors.white,
    },
  };
});

export default function Menu({
  items = menuItems,
  currentItemId,
  isSticky,
}) {
  const itemsMapped = items.map(item => {
    return (
      <MenuItem
        key={item.id}
        mr={-1}
        ml={[3, 4]}
        height={60}
        alignItems={'stretch'}
        isSelected={currentItemId === item.id}
      >
        <Link href={item.href} passHref>
          <LinkNoDecoration
            display='flex'
            alignItems='center'
            textStyle='caption'
            fontSize={[1, 2]}
            color='inherit'
            pr={[0, 1]}
            pl={[0, 1]}
          >
            {item.title}
          </LinkNoDecoration>
        </Link>
      </MenuItem>
    );
  });

  let stickyProps = {};
  if (isSticky) {
    stickyProps = {
      position: 'sticky',
      top: '0px',
    };
  }

  return (
    <BoxFlex
      pl={[1, 1, 1]}
      pr={[2, 3, 4]}
      alignItems='stretch'
      borderBottom='1px solid'
      borderColor='black'
      bg='white'
      zIndex='2'
      height='61px'
      {...stickyProps}
    >
      {/*
      <Link href={'/'} passHref>
        <LinkNoDecoration display='flex' alignItems='center'>
          <Logo size={40} innerColor={'primary'} outerColor='black' />
        </LinkNoDecoration>
      </Link>
      */}
      {itemsMapped}
    </BoxFlex>
  );
}

import React from 'react';
import IconLink from './IconLink';
import Svg from './Svg';

import siteInfo from '../siteInfo';

export default function IconLinkTwitter(props) {
  return (
    <IconLink {...props} title='Email' href={siteInfo.emailLink}>
      <Svg
        width={props.width}
        height={props.height}
        viewBox='0 0 40 32'
      >
        <path
          d='M36 0H4C1.8 0 .02 1.8.02 4L0 28c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zm0 8L20 18 4 8V4l16 10L36 4v4z'
          fill={props.color}
          fillRule='nonzero'
        />
      </Svg>
    </IconLink>
  );
}

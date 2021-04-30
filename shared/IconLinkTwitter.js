import React from 'react';
import IconLink from './IconLink';
import Svg from './Svg';

import siteInfo from '../siteInfo';

export default function IconLinkTwitter(props) {
  return (
    <IconLink
      {...props}
      title='Twitter: @flpvsk'
      href={siteInfo.twitterLink}
    >
      <Svg
        height={props.height}
        width={props.width}
        viewBox='0 0 40 33'
      >
        <path
          d='M35.888 8.227c.026.361.026.722.026 1.083 0 11.004-8.249 23.684-23.325 23.684-4.645 0-8.96-1.366-12.589-3.737.66.077 1.294.103 1.98.103a16.26 16.26 0 0 0 10.177-3.557c-3.604-.077-6.624-2.474-7.665-5.772.508.077 1.016.129 1.549.129.736 0 1.472-.104 2.157-.284-3.756-.773-6.574-4.123-6.574-8.17v-.102A8.162 8.162 0 0 0 5.33 12.66a8.352 8.352 0 0 1-3.655-6.932c0-1.547.406-2.964 1.117-4.201 4.035 5.051 10.101 8.35 16.903 8.71a9.536 9.536 0 0 1-.203-1.906c0-4.588 3.655-8.324 8.198-8.324a8.121 8.121 0 0 1 5.99 2.628 15.992 15.992 0 0 0 5.203-2.01 8.28 8.28 0 0 1-3.604 4.587c1.65-.18 3.249-.644 4.72-1.288a17.773 17.773 0 0 1-4.11 4.303z'
          fill={props.color}
          fillRule='nonzero'
        />
      </Svg>
    </IconLink>
  );
}

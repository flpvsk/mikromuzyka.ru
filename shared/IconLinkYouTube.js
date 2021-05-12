import React from 'react';
import Svg from './Svg';
import IconLink from './IconLink';

import siteInfo from '../siteInfo';

export default function IconLinkYouTube(props) {
  return (
    <IconLink
      {...props}
      title='YouTube: '
      href={siteInfo.youTubeLink}
    >
      <Svg
        height={props.height}
        width={props.width}
        viewBox="0 0 176 124"
      >
        <defs>
          <polygon
            id="path-1"
            points="0.06 0.04 176 0.04 176 124 0.06 124" />
        </defs>
        <g
          id="yt_icon_mono_light"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fill-rule="evenodd"
        >
            <g id="Group-3">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-2" />
              <path d="M172.322,19.363 C170.298,11.741 164.335,5.739 156.762,3.702 C143.037,0 88,0 88,0 C88,0 32.963,0 19.238,3.702 C11.666,5.739 5.702,11.741 3.678,19.363 C0,33.177 0,62 0,62 C0,62 0,90.822 3.678,104.638 C5.702,112.259 11.666,118.261 19.238,120.299 C32.963,124 88,124 88,124 C88,124 143.037,124 156.762,120.299 C164.335,118.261 170.298,112.259 172.322,104.638 C176,90.822 176,62 176,62 C176,62 176,33.177 172.322,19.363" id="Fill-1" fill="#222321" mask="url(#mask-2)" />
            </g>
            <polyline
              id="Fill-4"
              fill="#eee"
              points="70 88.169 116 62.001 70 35.831 70 88.169"
            />
        </g>
      </Svg>
    </IconLink>
  );
}

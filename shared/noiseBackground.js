import { css } from '@emotion/core';

function inlineSvgNoise(color) {
  return escape(
    `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 300 300"
      width="300"
      height="300">
        <defs>
          <filter id="a">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.4"
              stitchTiles="stitch"
              result="noisy"/>
            <feColorMatrix
              in="noisy"
              result="noisy2"
              type="saturate"
              values="0"/>
            <feColorMatrix
              in="noisy2"
              result="noisy3"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0"/>
            <feBlend
              in="SourceGraphic"
              in2="noisy3"
              mode="darken"/>
          </filter>
        </defs>
      <path filter="url(#a)" fill="${color}" d="M0 0h300v300H0z"/>
    </svg>
  `
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
  );
}

export default function noiseBackground(props) {
  // background-image: ${
  //   `url(data:image/svg+xml;utf8,` +
  //   `${inlineSvgNoise(props.theme.colors.primary)})`
  // };
  return css`
    background-color: ${props.theme.colors.primary};
  `;
}

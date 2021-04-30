import Iframe from './Iframe';

function toSrc({ id }) {
  return (
    `https://coub.com/embed/${id}` +
    `?muted=false&autostart=false&originalSize=false&startWithHD=false`
  );
}

export default function VideoCoub({
  id,
  width = '100%',
  height = 400,
  ...other
}) {
  return (
    <Iframe
      {...other}
      width={width}
      height={height}
      src={toSrc({ id })}
      allowfullscreen
      frameborder='0'
      allow='autoplay'
    />
  );
}

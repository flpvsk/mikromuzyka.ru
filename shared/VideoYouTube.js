import Iframe from './Iframe';

export default function VideoYouTube({
  id,
  width = '100%',
  height = '400px',
  ...other
}) {
  return (
    <Iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id}`}
      frameborder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen
      {...other}
    />
  );
}

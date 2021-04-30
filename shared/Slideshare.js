import Iframe from './Iframe';

export default function Slideshare({
  width = '100%',
  height = '400px',
  id,
  ...other
}) {
  return (
    <Iframe
      {...other}
      src={`https://www.slideshare.net/slideshow/embed_code/key/${id}`}
      width={width}
      height={height}
      frameborder={0}
      allowfullscreen
      marginwidth='0'
      marginheight='0'
      scrolling='no'
    />
  );
}

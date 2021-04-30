import BoxFlex from './BoxFlex';

export default function Separator({ n = 1, ...otherProps }) {
  return (
    <BoxFlex {...otherProps}>
      <img
        width='100%'
        height='60px'
        src={`/static/separator-${n}.svg`}
        alt='Separator'
      />
    </BoxFlex>
  );
}

Separator.defaultProps = {
  mt: [4, 4, 6],
};

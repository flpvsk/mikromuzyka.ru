import styled from '@emotion/styled';
import TextHeading from '../shared/TextHeading';

const TextItemHeading = styled(TextHeading)();
TextItemHeading.defaultProps = {
  as: 'h3',
  textStyle: 'h3',
  fontSize: [4, 4, 5, 5],
  mb: 2,
  mt: 0,
};

export default TextItemHeading;

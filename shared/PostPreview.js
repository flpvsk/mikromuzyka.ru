import Link from 'next/link';

import Box from '~/shared/Box';
import LinkText from '~/shared/LinkText';
import TextHeading from '~/shared/TextHeading';
import TextItemBody from '~/shared/TextItemBody';

export default function PostPreview(props) {
  const { title, heading, description, path } = props;

  return (
    <Box as='article' maxWidth={'43rem'} mt={0} mb={[5, 5, 7]}>
      <TextHeading
        as='h3'
        textStyle='h3'
        fontSize={[4, 4, 5, 5]}
        mb={2}
      >
        <Link href={path} passHref={true}>
          <LinkText>{heading || title}</LinkText>
        </Link>
      </TextHeading>
      <TextItemBody fontSize={[1, 1, 2, 2]}>{description}</TextItemBody>
    </Box>
  );
}

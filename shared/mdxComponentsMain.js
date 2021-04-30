import Link from 'next/link';

import LinkText from './LinkText';
import LinkExternal from './LinkExternal';
import LinkExternalNoDecoration from './LinkExternalNoDecoration';
import TextItemBody from './TextItemBody';
import TextItemHeading from './TextItemHeading';

const components = {
  h3: props => <TextItemHeading {...props} mb={1} />,
  p: TextItemBody,
  a: props => {
    const { href } = props;

    if (!href || href.indexOf(':') === '-1') {
      return (
        <Link href={href} passHref>
          <LinkText color='blacks.0' {...props} />
        </Link>
      );
    }

    return <LinkExternal {...props} />;
  },
};

export default components;

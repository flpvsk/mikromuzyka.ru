import { MDXProvider } from '@mdx-js/react';
import components from '~/shared/mdxComponentsBlog';

export default function BlogText({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

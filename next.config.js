const visit = require('unist-util-visit');
const retext = require('retext');
const retextSmartypants = require('retext-smartypants');
const buildConfig = require('@next/mdx');

function remarkSmartypants(options) {
  const processor = retext()
    .use(retextSmartypants, options)

  function transformer(tree) {
    visit(tree, 'text', node => {
      node.value = String(processor.processSync(node.value));
    });
  }

  return transformer;
}

const withMDX = buildConfig({
  options: {
    remarkPlugins: [
      [ remarkSmartypants, {} ]
    ]
  },
  extension: /.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
});

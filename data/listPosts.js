// import { formatSEODate, getSecondsSinceEpoch } from "./formatters";
const fs = require('fs-extra');

const postFileNames = async () => {
  return fs.readdir('./pages/posts');
};

const createPostList = fileNameList => {
  return fileNameList.reduce((collection, name) => {
    // These are properties we want to extract from the file's meta
    // export.  This data is returned is added to the `collection` array
    // below.

    let meta;

    try {
      meta = require(`../pages/posts/${name}`).meta;
    } catch (e) {
      meta = require(`../pages/posts/${name}/index.md`).meta;
    }

    const {
      title,
      tags,
      publishDate,
      modifiedDate,
      exclude = false,
      ...moreMeta // any extra properties a post may have
    } = meta;

    if (exclude) {
      return collection;
    }

    // remove the extension from the file name to make a component name
    // string
    const cleaned_name = name.split('.')[0];

    // data that is returned for each page
    collection.push({
      title,
      tags,
      publishDate,
      modifiedDate,
      exclude,
      urlPath: `/${cleaned_name}`,
      fullUrlPath: `/posts/${cleaned_name}`,
      name: cleaned_name,
      type: 'post',
      ...moreMeta, // any extra properties a post may have
    });

    return collection;
  }, []);
};

module.exports = async function listPosts() {
  try {
    console.log('x');
    const fileNames = await postFileNames();
    const postList = createPostList(fileNames);
    return postList
      .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
      .reverse();
  } catch (e) {
    console.error('Error listing posts', e);
  }
};

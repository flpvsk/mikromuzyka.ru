import Head from 'next/head';
import MetaFavicon from './MetaFavicon';
import siteInfo from '~/siteInfo';

export default function MetaArticle({
  title,
  heading,
  author,
  description,
  path,
  image,
  tags,
  publishDate,
  modifiedDate,
}) {
  const titleText = title || '';
  const headingText = heading || titleText;

  let imageTags = [];
  let twitterCardType = 'summary';

  if (image) {
    const imgUrl = `${siteInfo.host}${image}`;
    imageTags = [
      <meta key='image' name='image' content={imgUrl} />,
      <meta
        key='twitter:image:src'
        name='twitter:image:src'
        content={imgUrl}
      />,
      <meta key='og:image' name='og:image' content={imgUrl} />,
    ];
    twitterCardType = 'summary_large_image';
  }

  let publishDateTag;
  let modifiedDateTag;
  if (publishDate) {
    publishDateTag = (
      <meta
        name='article:published_time'
        content={`${publishDate}T19:00:00+00:00`}
      />
    );
  }

  if (modifiedDate) {
    modifiedDateTag = (
      <meta
        name='article:modified_time'
        content={`${modifiedDate}T19:00:00+00:00`}
      />
    );
  }

  let tagsTag;
  if (tags && tags.length) {
    const tagsStr = (tags || []).join(' ');
    tagsTag = <meta name='article:tag' content={tagsStr} />;
  }

  return (
    <Head>
      <title>
        {titleText}
        {` – ${siteInfo.blogTitle}`}
      </title>
      <meta name='description' content={description} />

      <meta itemProp='name' content='Andrey Salomatin' />
      <meta itemProp='description' content={description} />

      <meta name='twitter:card' content={twitterCardType} />
      <meta name='twitter:title' content={titleText} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content='@flpvsk' />
      <meta name='twitter:creator' content='@flpvsk' />

      <meta name='og:title' content={titleText} />
      <meta name='og:description' content={description} />
      <meta name='og:url' content={`${siteInfo.host}${path}`} />
      <meta name='og:site_name' content={siteInfo.blogName} />
      <meta name='og:type' content='article' />

      {imageTags}
      {tagsTag}
      {publishDateTag}
      {modifiedDateTag}

      <MetaFavicon />
    </Head>
  );
}

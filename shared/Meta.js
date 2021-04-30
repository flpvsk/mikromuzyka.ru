import Head from 'next/head';
import siteInfo from '~/siteInfo';

export default function Meta() {
  const { host } = siteInfo;
  return (
    <>
      <Head>
        <title>{siteInfo.siteName}</title>
        {/* Search Engine */}
        <meta
          name='description'
          content='Personal website and blog of a coder, product manager and founder Andrey Salomatin'
        />
        <meta
          name='image'
          content={`${host}/static/logo-flpvsk-square-splash400w.png`}
        />
        {/* Schema.org for Google */}
        <meta itemProp='name' content='Andrey Salomatin' />
        <meta
          itemProp='description'
          content='Personal website and blog of a coder, product manager and founder Andrey Salomatin'
        />
        <meta
          itemProp='image'
          content={`${host}/static/logo-flpvsk-square-splash400w.png`}
        />
        {/* Twitter */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Andrey Salomatin' />
        <meta
          name='twitter:description'
          content='Personal website and blog of a coder, product manager and founder Andrey Salomatin'
        />
        <meta name='twitter:site' content='@flpvsk' />
        <meta name='twitter:creator' content='@flpvsk' />
        <meta
          name='twitter:image:src'
          content={`${host}/static/logo-flpvsk-square-splash400w.png`}
        />
        {/* Open Graph general */}
        <meta name='og:title' content='Andrey Salomatin' />
        <meta
          name='og:description'
          content='Personal website and blog of a coder, product manager and founder Andrey Salomatin'
        />
        <meta
          name='og:image'
          content={`${host}/static/logo-flpvsk-square-splash400w.png`}
        />
        <meta name='og:url' content={host} />
        <meta name='og:site_name' content='Andrey Salomatin' />
        <meta name='og:type' content='website' />
      </Head>
    </>
  );
}

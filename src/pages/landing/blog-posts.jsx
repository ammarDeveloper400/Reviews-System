import { Helmet } from 'react-helmet-async';

import { BlogPostsView } from 'src/sections/landing/blog/view';
// import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPostsPage() {
  return (
    <>
      <Helmet>
        <title> Blog Posts | RMS </title>
      </Helmet>

      <BlogPostsView />
    </>
  );
}
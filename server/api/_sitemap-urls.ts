import db from '../../db/db';

const routes = ['/about', '/contacts', '/delivery', '/payment', '/warranty', '/public-offer', '/privacy-and-terms'];
export default cachedEventHandler(
  async (e) => {
    const [categories] = await db.execute('SELECT uri FROM site_categories where visible=1 LIMIT 10000');
    const [products] = await db.execute('SELECT uri FROM site_products where enabled=1 LIMIT 10000');

    const posts = [...routes, ...categories.map((item: any) => item.uri), ...products.map((item: any) => '/p/' + item.uri.replace('.html', ''))];
    return posts.map((p) => {
      return {
        loc: p,
      };
    });
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 10, // cache URLs for 10 minutes
  }
);

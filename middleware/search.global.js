export default defineNuxtRouteMiddleware(async (to) => {
  const hostname = process.env.NUXT_PUBLIC_HOSTNAME ?? '';
  if (to.path === '/search' && to.query.q) {
    const res = await fetch(`${hostname}/api/products/searchById?q=${to.query.q}`).then((res) => res.json());

    if (res.url?.length) {
      return navigateTo(`/p/${res.url.replace('.html', '')}`);
    }
  }
});

import { GetServerSidePropsContext } from "next";
import { redirect } from "./redirect";

export default async function fetch(
  url: string,
  init?: RequestInit,
  ctx?: GetServerSidePropsContext
) {
  if (url.startsWith('/')) {
    url = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  }

  init = init || {};

  init = ctx
    // If SSR, forward cookie received from client.
    ? {
      ...init ,
      headers: { ...init.headers, cookie: ctx.req.headers.cookie }
    }
    // If CSR, send cookie in CORS request.
    : { ...init , credentials: 'include' };

  // console.log('FETCHER', url, init);
  
  const res = await global.fetch(url, init);
  
  if (res.status === 401) {
    const pageRequested = ctx
      ? ctx.resolvedUrl.substring(1)
      : window.location.href.split('://')[1].split('/')[1]
    ;

    return redirect(`login?page_requested=${pageRequested}`, ctx, true);
  }
  
  return res.json();
};
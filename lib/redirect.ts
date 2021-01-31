import { GetServerSidePropsContext, NextPageContext } from 'next'
import { Router } from 'next/router'
import { getCookieForLogout } from './auth'

export const redirect = (
  url: string,
  ctx: GetServerSidePropsContext | NextPageContext = null,
  logout = false
): { redirect: { destination: string; permanent: boolean } } | void => {
  if (ctx) {
    if (logout) {
      // https://github.com/vercel/next.js/discussions/14890#discussioncomment-222057
      ctx.res.setHeader('Set-Cookie', getCookieForLogout())
    }

    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    }
  }

  Router.prototype.replace(url)
  // return null;
}

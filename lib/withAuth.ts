import { GetServerSidePropsContext } from 'next'
import { decodeJWT } from './auth'
import { redirect } from './redirect'

export const withAuth = (getServerSidePropsFn: any) => (ctx: GetServerSidePropsContext) => {
  if (!ctx.req.cookies.auth) {
    return redirectLogin(ctx)
  }

  const token = decodeJWT(ctx.req.cookies.auth)

  if (!token) {
    return redirectLogin(ctx)
  }

  if (Date.now() >= token.exp * 1000) {
    return redirectLogin(ctx)
  }

  // if (!isLoggedin(ctx)) {
  //   return redirect(
  //     `login?page_requested=${ctx.resolvedUrl.substring(1)}`,
  //     ctx,
  //     true
  //   );
  // }

  // const { iat, exp, ...user } = token
  const user = { ...token }
  delete user.iat
  delete user.exp

  return getServerSidePropsFn({ ctx, user })
}

const redirectLogin = (ctx: GetServerSidePropsContext): any =>
  redirect(`/login?page_requested=${encodeURIComponent(ctx.resolvedUrl.substring(1))}`, ctx, true)

import { GetServerSidePropsContext } from "next";
import { decodeJWT, isLoggedin } from "./auth";
import { redirect } from "./redirect";

export const withAuth = (getServerSidePropsFn: Function) => (ctx: GetServerSidePropsContext) => {
  if (!ctx.req.cookies.auth) {
    return redirectLogin(ctx);
  }

  const token = decodeJWT(ctx.req.cookies.auth);

  if (!token) {
    return redirectLogin(ctx);
  }

  if (Date.now() >= token.exp * 1000) {
    return redirectLogin(ctx);
  }

  // if (!isLoggedin(ctx)) {
  //   return redirect(
  //     `login?page_requested=${ctx.resolvedUrl.substring(1)}`,
  //     ctx,
  //     true
  //   );
  // }

  console.log('token', token);
  
  const { iat, exp, ...user } = token;

  return getServerSidePropsFn({ ctx, user });
}

const redirectLogin = (ctx: GetServerSidePropsContext) => redirect(
  `login?page_requested=${ctx.resolvedUrl.substring(1)}`,
  ctx,
  true
);

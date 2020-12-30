import { GetServerSidePropsContext, NextPageContext } from "next";

export const decodeJWT = (token: string): any => {
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('ascii')
    );
  } catch (error) {
    return null;
  }
}

const expirationTime = (token: string): number => {
  try {
    return decodeJWT(token).exp * 1000;
  } catch (error) {
    return 0;
  }
}

export const getCookieForLogout = (ctx: GetServerSidePropsContext | NextPageContext): string =>
  process.env.NODE_ENV === 'development'
    ? 'auth=;Path=/;Max-Age=0;HttpOnly'
    : `auth=;Path=/;Max-Age=0;HttpOnly;Domain=.${process.env.DOMAIN};Secure;SameSite=None`;

export const isLoggedin = (ctx: GetServerSidePropsContext | NextPageContext) => {
  // https://github.com/vercel/next.js/pull/19724
  // @ts-ignore Property 'cookies' does not exist on type 'IncomingMessage'.
  const token = ctx.req?.cookies.auth;
  
  return !!token && Date.now() < expirationTime(token);
}

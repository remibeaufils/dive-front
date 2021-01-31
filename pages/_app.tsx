import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayout from '../layouts/MainLayout'
import './_app.less'

const MyApp = ({ Component, pageProps: { user, ...props } }: AppProps) => {
  return (
    // <AuthProvider>
    <MainLayout user={user}>
      <Head>
        <meta name="description" content="hola"></meta>
        {/* https://github.com/vercel/next.js/pull/14746 */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Head>
        <title>Dive</title>
      </Head>
      <Component {...props} />
    </MainLayout>
    // </AuthProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
/* MyApp.getInitialProps = async (appContext: AppContext) => {
  const { Component, router, ctx } = appContext;
  
  // console.log('_app getInitialProps', ctx.res);
  console.log('_app getInitialProps', !!ctx.req, !!ctx.pathname, typeof window);
  
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  if (!isLoggedin(ctx)) {
    console.log('getInitialProps !LOGGEDIN');
    if (ctx.req && ctx.req.url !== '/login') {
      console.log('getInitialProps REDIRECTT');

      // Seems to be the version used by zeit
      ctx.res.writeHead(302, {
        Location: '/login',
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      });
      console.log('getInitialProps REDIRECT 1');
      ctx.res.end();
      console.log('getInitialProps REDIRECT 2');
      return; 
      console.log('getInitialProps REDIRECT 3');
      
      // return redirect(
      //   `login?page_requested=${ctx.req.url.substring(1)}`,
      //   ctx,
      //   true
      // );
    } else if (ctx.pathname !== '/login') {
      console.log('REDIRECT CLIENT');
      return {};
    }
  }
  //  else {

    // console.log('NO REDIRECT');
  
    return { ...appProps };
  // }
} */

/* MyApp.getInitialProps = async (appContext: AppContext) => {
  console.log('getInitialProps');
  
  const { router, ctx } = appContext;

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  let user;

  if (typeof window === 'undefined') {
    console.log('SERVER', router.pathname);

    const loggedin = isLoggedin(ctx);
    
    if(!loggedin && router.pathname !== '/login') {
      ctx.res.writeHead(307, {
        Location: `/login?page_requested=${router.pathname.substring(1)}`,
        // Location: `https://www.google.com`,
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      });

      ctx.res.end();
    }

    if(loggedin) {
      // TODO needed client side (done in login page..)
      // TODO if connected, pass the decoded jwt to client via cookie, so client can show user name, check expiration on client transition page
      // ctx.res.setHeader('Set-Cookie', decode('auth2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRpdmVhbmFseXRpY3MuY28iLCJpYXQiOjE2MDk5NTQwNjAsImV4cCI6MTYwOTk1NDY2MH0.BpG8Utadfh72Wc_AADfK9MvbzpMZ1xycRBR_gpS4RTA;Path=/;Max-Age=600'));

      user = { name: 'Rémi' };

      if(router.pathname === '/login') {
        ctx.res.writeHead(307, {
          Location: `/`,
          // Add the content-type for SEO considerations
          'Content-Type': 'text/html; charset=utf-8',
        });

        ctx.res.end();
      }
    }
  } else {
    // TODO HOW TO check if connected CLIENT SIDE
    // from localstorage?
    // on logout clean localstorage
    console.log('CLIENT', ctx);
  }

  console.log('getInitialProps END');

  return user
    ? { ...appProps, user }
    : { ...appProps };
} */

export default MyApp

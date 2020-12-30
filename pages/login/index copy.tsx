import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { isLoggedin } from "../../lib/auth";
import fetch from "../../lib/fetch";
import { redirect } from "../../lib/redirect";

export type LoginInputs = {
  email: string
  password: string
}

const LoginPage: NextPage<void> = () => {
  console.log('Login');
  
  const initialValues: LoginInputs = { 
    email: 'admin@diveanalytics.co',
    password: '239$gk*)84',
  };

  const [inputs, setInputs] = useState(initialValues);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    // const data = await fetch('/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: inputs.email,
    //     password: inputs.password,
    //   })
    // });
    
    const response = await global.fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      },
    );

    const data = await response.json();

    setMessage(data);

    if (!response.ok) {
      return;
    }

    // Before redirecting to requested page => need to get the AUTH token present in cookie and set it in App context to make user data available.

    // Read a HttpOnly cookie client side = not possible.
    router.replace((router.query.page_requested as string) || '/dashboard');

    // So => navigate reloading page to get AUTH cookie server side.
    // window.location.href = (router.query.page_requested as string) || '/';

    // À voir si nécéssaire si getServerSideProps utilisé dans tous les composants private car ça force le ssr.
  };

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    e.persist();

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log('LoginPage getServerSideProps');
  
  if (isLoggedin(ctx)) {
    console.log('LOGIN REDIRECT');
    return redirect('/dashboard', ctx);
  }
  console.log('LOGIN NO REDIRECT');

  return { props: {} }
};

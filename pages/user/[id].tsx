import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

type User = {
  id: string;
  name: string;
  email: string;
};

interface Props {
  user: User
}

// TEST: http://localhost:3000/user/1?param=value

const UserPage: NextPage<Props> = ({ user }) => {
  if (!user) {
    return <ErrorPage statusCode={404} />
  }

  const router = useRouter();

  const { id, ...rest } = router.query;

  return (
    <>
      <h2>User ID ={user.id}</h2>
      <p>User name ={user.name}</p>
      <pre>{JSON.stringify(rest)}</pre>
    </>
  )
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
  console.log('UserPage getServerSideProps');

  try {
    const { id } = params;
    const result = await fetch(`http://localhost:3000/api/user/${id}`);
    const user: User = await result.json();
    return {
      props: { user }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: {}
    }
  }
}
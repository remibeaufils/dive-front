import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import ErrorPage from "next/error";

type Data = {
  id: string;
  name: string;
  email: string;
};

// TEST: http://localhost:3000/user/1?param=value

const UserPage: NextPage<{data: Data}> = props => {
  if (!props.data) {
    return <ErrorPage statusCode={404} />
  }

  const router = useRouter();
  const { id, ...rest } = router.query;
  return (
    <>
      <h2>User ID ={props.data.id}</h2>
      <p>User name ={props.data.name}</p>
      <pre>{JSON.stringify(rest)}</pre>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
  try {
    const { id } = params;
    const result = await fetch(`http://localhost:3000/api/user/${id}`);
    const data: Data = await result.json();
    return {
      props: { data }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: {}
    }
  }
}

export default UserPage;
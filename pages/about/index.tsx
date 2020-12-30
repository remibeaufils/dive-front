import { GetStaticProps, NextPage } from 'next';

interface Owner {
  name: string;
}

interface Props {
  owners: Owner[];
}

const AboutPage: NextPage<Props> = ({ owners }) => {
  return (
    <>
      <h1>About</h1>
      <ul>
        {owners?.map(owner => <li key={owner.name}>{owner.name}</li>)}
      </ul>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Note: You should not use fetch() to call an API route in getStaticProps. Instead, directly import the logic used inside your API route. You may need to slightly refactor your code for this approach. Fetching from an external API is fine!

  // const res = await fetch('http://localhost:3000/api/about');
  // const owners = await res.json();

  const owners: Owner[] = [
    { name: 'A'},
    { name: 'T'},
    { name: 'R'},
  ];

  return { props: { owners } };
};

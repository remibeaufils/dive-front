import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { withAuth } from '../lib/withAuth';

const PrivatePage: React.FC = (props) => {
  console.log('PrivatePage', props);
  
  return <div>Private page.</div>;
};

export default PrivatePage;

export const getServerSideProps = withAuth(async ({ ctx, user }: { ctx: GetServerSidePropsContext, user: any }) => {
  // console.log('Private getServerSideProps');
  return { props: { user } }
});

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   console.log('Private getServerSideProps');
//   return { props: { } }
// };

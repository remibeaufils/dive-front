import * as React from 'react';

class ActivityPage extends React.Component {
  state = {};

  render() {
    return (
      <>activity</>
    );
  }
}

export default ActivityPage

// export const getServerSideProps = async () => {
//   console.log('ActivityPage getServerSideProps');
//   // return { props: {} }

//   return {
//     redirect: {
//       // destination: 'https://googsssdfdfsfdsffle.com',
//       destination: '/login?error=Gorgias%20account%20not%20found',
//       permanent: false,
//     }
//   };
// };
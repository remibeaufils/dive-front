import { NextApiHandler } from "next";

const redir: NextApiHandler = (req, res) => {
  console.log('redir');
  
  // if (true || /* req.method === 'POST' &&  */req.body.merchant) {
    // res.writeHead(307, { Location: `https://www.${req.body.merchant}.diveanalytics.co` });
    // res.writeHead(307, { Location: `https://www.google.com` });
    // res.status(200).json({ redirectURL: `https://www.${req.body.merchant}.diveanalytics.co`});
    // res.writeHead(307, { Location: `/login?error=Dive%20account%20not%20found.` });
    // res.end();
  // }
  res.status(200).json({ ok: '1'});
}

export default redir;
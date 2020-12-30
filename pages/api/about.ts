import { NextApiHandler } from "next";

const about: NextApiHandler = (req, res) => {
  res.status(200).json([
    { name: 'A'},
    { name: 'T'},
    { name: 'R'},
  ]);
}

export default about;
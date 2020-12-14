import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import moment from 'moment';
import data from "../../lib/dashboard.json";

const dashboard: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { from, to } = req.query;

  const monthFrom = moment(from).startOf('month');
  const monthTo = moment(to).endOf('month');

  res.status(200).json(data.filter(
    ({ month }) => moment(month).isBetween(monthFrom, monthTo, undefined, '[]')
  ));
}

export default dashboard;
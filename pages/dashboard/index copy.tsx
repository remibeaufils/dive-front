import React from 'react';
import Head from 'next/head';
import { Card, Col, Row, DatePicker, Table, Typography } from 'antd';
import moment from 'moment';
import useSWR from 'swr'
import { DataRow } from '../api/dashboard';
import ChartArea from '../../components/dashboard/ChartArea';
import ChartColumn from '../../components/dashboard/ChartColumn';

const { RangePicker } = DatePicker;

// class DashboardPage extends React.Component {
//   state = {};
//   render() { return (<>dashboard</>); }
// }

type Series = {
  [name: string]: { x: string, y: number }[]
};

const fetcher = async (url: string, params: string) => {
  const queryString = Object.keys(params).reduce((acc, key) => [
    ...acc,
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  ], []);
  // return fetch(`${url}?${queryString.join('&')}`).then(res => res.json());
  const res = await fetch(`${url}?${queryString.join('&')}`);
  return res.json();
};

const DashboardPage: React.FC = () => {
  console.info('RUN');

  const params = { from: moment().format(), to: moment().format() };
  
  const { data, error, mutate } = useSWR(['/api/dashboard', params], fetcher);

  // const onChange = (a) => {
  //   mutate([{	month: 	"2020-03"	, totalRevenue: 	300000	, adspendGlobal: 	32	, roas: 	5.28	, cpa: 	20.9	, totalOrders: 	3800	, averageOrderValue: 	70	, topCountry: 	"Germany"	, abandonmentRate: 	0.8	, vat:	333908.23	, quantity: 	6890	, profit: 	150987	, profitPerUnit: 	22	}], false);
  // };
    
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  const { data1, data2, data3, data4, data5, data6, data7, data8 } = data.reduce((
    { data1, data2, data3, data4, data5, data6, data7, data8 }: Series,
    dataRow: DataRow,
    index: number
    ) => {
      const { month, totalRevenue, adspendGlobal, roas, cpa, totalOrders, averageOrderValue, abandonmentRate } = dataRow;
      const x = moment(month).format('MMM');
      const monthFull = moment(month).format('MMMM');
      return {
        data1: [ ...data1, { x, y: totalRevenue } ],
        data2: [ ...data2, { x, y: adspendGlobal } ],
        data3: [ ...data3, { x, y: roas } ],
        data4: [ ...data4, { x, y: cpa } ],
        data5: [ ...data5, { ...dataRow, month: monthFull, key: `${index+1}`} ],
        data6: [ ...data6, { x, y: totalOrders } ],
        data7: [ ...data7, { x, y: averageOrderValue } ],
        data8: [ ...data8, { x, y: abandonmentRate } ],
      };
    },
    { data1: [], data2: [], data3: [], data4: [], data5: [], data6: [], data7: [], data8: [] }
  );

  console.log('data1', data1);

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month'
    },
    {
      title: 'Turnover (VAT excluded) in USD',
      dataIndex: 'vat',
      key: 'vat',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'AdSpend Global',
      key: 'adspendGlobal',
      dataIndex: 'adspendGlobal'
    },
    {
      title: 'ROAS',
      key: 'roas',
      dataIndex: 'roas'
    },
    {
      title: 'CPA',
      key: 'cpa',
      dataIndex: 'cpa'
    },
    {
      title: 'Profit (USD)',
      key: 'profit',
      dataIndex: 'profit'
    },
    {
      title: 'Profit per unit (USD)',
      key: 'profitPerUnit',
      dataIndex: 'profitPerUnit'
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Typography.Title>Dashboard</Typography.Title>

          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              // 'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last 7 days': [moment().subtract(7, 'days'), moment()],
              'Last 30 days': [moment().subtract(30, 'days'), moment()],
              'Last 12 weeks': [moment().subtract(12, 'weeks'), moment()],
              'Last 12 months': [moment().subtract(12, 'months'), moment()],
            }}
            onChange={onChange}
          />
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartArea title="Total Revenue" data={data1}/>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartColumn
              data={data2}
              title="Adspend (global)"
              xLabel="Month"
              yLabel="Amount"
            />
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartArea title="ROAS" data={data3}></ChartArea>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartArea title="CPA" data={data4}></ChartArea>
          </Card>
        </Col>

        <Col xs={24}>
          <Card>
            <Table
              scroll={{x: true}}
              columns={columns}
              dataSource={data5}
              pagination={false}/>
          </Card>
        </Col>

        <Col xs={24}>
          <Typography.Title level={2}>Store Insights</Typography.Title>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartColumn
              data={data6}
              title="Total Orders"
              xLabel="Month"
              yLabel="Total"
            />
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartArea title="Average Order Value" data={data7}></ChartArea>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <Typography.Title level={4}>Top countries</Typography.Title>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card>
            <ChartArea title="Abandonment Rate" data={data8}></ChartArea>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
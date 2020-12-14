import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Col, Row, DatePicker, Table, Typography } from 'antd';
import moment from 'moment';
import ChartArea from '../../components/dashboard/ChartArea';
import ChartColumn from '../../components/dashboard/ChartColumn';
import "./dashboard.less";

const { RangePicker } = DatePicker;
const { Title } = Typography;

type Series = { [name: string]: { x: string, y: number }[] };

type DataRow = {
  month: string,
  totalRevenue: number,
  adspendGlobal: number,
  roas: number,
  cpa: number,
  totalOrders: number,
  averageOrderValue: number,
  topCountry: string,
  abandonmentRate: number,
  vat: number,
  quantity: number,
  profit: number,
  profitPerUnit: number,
};

const fetcher = async (url: string, params: Object) => {
  const queryString = Object.keys(params).reduce((acc, key) => [
    ...acc,
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  ], []);
  // return fetch(`${url}?${queryString.join('&')}`).then(res => res.json());
  const res = await fetch(`${url}?${queryString.join('&')}`);
  return res.json();
};

const DashboardPage: React.FC = ({ initialData, initialFrom, initialTo }: any) => {
  const [data, setData] = useState(initialData);

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
      title: 'AdSpend',
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

  const onChange = async ([from, to]: [moment.Moment, moment.Moment]) => {
    const params = { from: from.format(), to: to.format() };
    const data = await fetcher('http://localhost:3000/api/dashboard', params);
    setData(data);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row gutter={16} align="middle">
            <Col flex="none">
              <Title style={{'marginBottom': 'unset'}}>Dashboard</Title>
            </Col>

            <Col flex="auto">
              <RangePicker
                size="large"
                ranges={{
                  Today: [moment(), moment()],
                  // 'This Month': [moment().startOf('month'), moment().endOf('month')],
                  'Last 7 days': [moment().subtract(7, 'days'), moment()],
                  'Last 30 days': [moment().subtract(30, 'days'), moment()],
                  'Last 12 weeks': [moment().subtract(12, 'weeks'), moment()],
                  'Last 12 months': [moment().subtract(12, 'months'), moment()],
                }}
                defaultValue={[moment(initialFrom), moment(initialTo)]}
                className="range-picker"
                onChange={onChange}
              />
            </Col>
          </Row>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="Total Revenue" data={data1}/>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartColumn
              data={data2}
              title="Adspend (global)"
              xLabel="Month"
              yLabel="Amount"
            />
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="ROAS" data={data3}></ChartArea>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="CPA" data={data4}></ChartArea>
          </Card>
        </Col>

        <Col xs={24}>
          <Card className="card">
            <Table
              className="table"
              scroll={{x: true}}
              columns={columns}
              dataSource={data5}
              pagination={false}/>
          </Card>
        </Col>

        <Col xs={24}>
          <Title level={2}>Store Insights</Title>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartColumn
              data={data6}
              title="Total Orders"
              xLabel="Month"
              yLabel="Total"
            />
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="Average Order Value" data={data7}></ChartArea>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <Title level={4}>Top countries</Title>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="Abandonment Rate" data={data8}></ChartArea>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;

export async function getServerSideProps() {
  const [ from, to ] = [moment().subtract(12, 'weeks').format(), moment().format()];
  
  const params = { from, to };
  const data = await fetcher('http://localhost:3000/api/dashboard', params);
  return {
    props: {
      initialData: data,
      initialFrom: from,
      initialTo: to
    }
  };
};

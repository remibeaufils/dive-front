import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Col, Row, DatePicker, Table, Typography } from 'antd';
import moment from 'moment';
import ChartArea from '../../components/dashboard/ChartArea';
import ChartColumn from '../../components/dashboard/ChartColumn';
import "./dashboard.less";
import { GetServerSidePropsContext, NextPage } from 'next';
import fetch from '../../lib/fetch';
import { withAuth } from '../../lib/withAuth';
import { buildQueryString } from '../../lib/buildQueryString';
import useSWR from '../../lib/useSWR';
import DashboardTable from '../../components/dashboard/DashboardTable';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const mappings = {
  ChartArea: ChartArea,
  ChartColumn: ChartColumn,
  Table: DashboardTable
};

type Serie = { x: string, y: number }[];

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

type Props = {
  initialData: any[],
  initialFrom: string,
  initialTo: string
};

const DashboardPage: NextPage<Props> = ({
  initialData,
  initialFrom,
  initialTo
}) => {
  const [queryParams, setQueryParams] = useState({ from: initialFrom, to: initialTo });

  const { data, isValidating } = useSWR(
    `/context/dashboard-sdui${buildQueryString(queryParams)}`,
    fetch,
    { initialData, revalidateOnFocus: false }
  );

  let { components, dataSources } = data || {};

  components = dataSources?.reduce((componentsFilteredWithDataAcc, ds) => [
    ...componentsFilteredWithDataAcc,
    ...ds.data.reduce((componentsFilteredAcc, dsRow: DataRow, i: number) => 
      componentsFilteredAcc.map((component) => ({
        ...component,
        // C: mappings[type],
        data: [
              ...component.data,
              component.type === 'Table'
                ? {
                    ...dsRow,
                    key: `${i+1}`,
                    month: moment(dsRow.month).format('MMMM')
                  }
                : { x: dsRow[component.config.x], y: dsRow[component.config.y] }
            ]
      })),
      // init componentsFilteredAcc
      components.filter(({ dataSourceName }) => dataSourceName === ds.name))
  ],
  // init componentsFilteredWithDataAcc
  []);

  const onRangeChange = async ([from, to]: [moment.Moment, moment.Moment]) => {
    setQueryParams({
      from: from.startOf('day').format(),
      to: to.endOf('day').format()
    });
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
                onChange={onRangeChange}
              />
            </Col>
          </Row>
        </Col>

        {isValidating && !data
          ? <p>Loading...</p>
          : components?.map(({ type, sizing, config, data, index }) => {
            const C = mappings[type];
            return (
              <Col key={index} {...sizing}>
                <Card className="card">
                  {C && <C {...config} data={data}/>}
                </Card>
              </Col>
            )
          })}
      </Row>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps = withAuth(async ({ ctx, token }: { ctx: GetServerSidePropsContext, token: string }) => {
// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log('DashboardPage getServerSideProps');
  
  const from = moment().startOf('day').subtract(12, 'weeks').format();
  const to = moment().endOf('day').format();
  
  const params = { from, to };

  const data = await fetch(
    `/context/dashboard-sdui${buildQueryString(params)}`,
    null,
    ctx
  );

  if (data?.redirect) {
    return data;
  }

  return {
    props: {
      initialData: data,
      initialFrom: from,
      initialTo: to
    }
  };
});
// };

import React from 'react';
import Head from 'next/head';
import { Card, Col, Row, DatePicker, Table, Typography } from 'antd';
import moment from 'moment';
import ChartArea from '../components/dashboard/ChartArea';
import ChartColumn from '../components/dashboard/ChartColumn';
import "./index.less";
import { GetServerSidePropsContext, NextPage } from 'next';
import fetch from '../lib/fetch';
import { withAuth } from '../lib/withAuth';
import { buildQueryString } from '../lib/buildQueryString';
import { useRouter } from 'next/router';
import ChartLine from '../components/dashboard/ChartLine';
import { ColumnsType, ColumnType } from 'antd/lib/table';

const { RangePicker } = DatePicker;
const { Title } = Typography;

type Series = { [name: string]: { x: string, y: number }[] };

type DataRow = {
  _id: { period_type: string, period_start: Date },
  turnover: number,
  adspendGlobal: number,
  roas: number,
  cpa: number,
  orders_count: number,
  orders_avg_value: number,
  topCountry: string,
  conversionRate: number,
  abandonmentRate: number,
  vat: number,
  quantity: number,
  profit: number,
  profitPerUnit: number,
};

type Props = {
  initialData: { lines: any[], columns: any[] },
  initialFrom: string,
  initialTo: string
};

const DashboardPage: NextPage<Props> = ({
  initialData,
  initialFrom,
  initialTo
}) => {
  // const [queryParams, setQueryParams] = useState({ from: initialFrom, to: initialTo });

  // const { data } = useSWR(
  //   `/context/dashboard${buildQueryString(queryParams)}`,
  //   url => fetch(url),
  //   { initialData, revalidateOnFocus: false }
  // );

  // const onRangeChange = async ([from, to]: [moment.Moment, moment.Moment]) => {
  //   setQueryParams({
  //     from: from.startOf('day').format(),
  //     to: to.endOf('day').format()
  //   });
  // };

  // const router = useRouter();

  // useEffect(() => {
  //   router.push({
  //     pathname: '/',
  //     query: {
  //       from: queryParams.from,
  //       to: queryParams.to
  //     }
  //   }, undefined, { shallow: true });
  // }, [queryParams]);

  // useEffect(() => {
  //   setQueryParams({
  //     from: router.query.from as string,
  //     to: router.query.to as string
  //   });
  // }, [router.query]);
  
  const data = initialData;

  const router = useRouter();

  const onRangeChange = async ([from, to]: [moment.Moment, moment.Moment]) => {
    router.push({
      pathname: '/',
      query: {
        from: from.startOf('day').format(),
        to: to.endOf('day').format()
      }
    });
    // router.push(
    //   `test?from=${encodeURIComponent(from.startOf('day').format())}&to=${encodeURIComponent(to.endOf('day').format())}`,
    //   `test?from=${encodeURIComponent(from.startOf('day').format())}&to=${encodeURIComponent(to.endOf('day').format())}`,
    // );
  };

  const { data1, data2, data3, data4, data5, data6, data7, data8, data9 } =
    (data.lines || []).reduce((
      { data1, data2, data3, data4, data5, data6, data7, data8, data9 }: Series,
      dataRow: DataRow,
      index: number
    ) => {
      const { _id, turnover, adspendGlobal, roas, cpa, orders_count, orders_avg_value, conversionRate, abandonmentRate } = dataRow;
      // const monthFull = moment(month).format('MMMM');
      return {
        data1: [ ...data1, { x: _id.period_start, y: turnover } ],
        // data2: [ ...data2, { x: month, y: adspendGlobal } ],
        // data3: [ ...data3, { x: month, y: roas } ],
        // data4: [ ...data4, { x: month, y: cpa } ],
        // data5: [ ...data5, { ...dataRow, month: monthFull, key: `${index+1}`} ],
        data6: [ ...data6, { x: _id.period_start, y: orders_count } ],
        data7: [ ...data7, { x: _id.period_start, y: orders_avg_value } ],
        // data8: [ ...data8, { x: month, y: conversionRate } ],
        // data9: [ ...data9, { x: month, y: abandonmentRate } ],
      };
    },
    { data1: [], data2: [], data3: [], data4: [], data5: [], data6: [], data7: [], data8: [], data9: [] }
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row gutter={16} align="middle">
            <Col flex="none">
              <Title>Dashboard</Title>
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
                clearIcon={false}
              />
            </Col>
          </Row>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="Total Revenue" data={data1}/>
          </Card>
        </Col>

        {/* <Col md={24} lg={6}>
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
            <ChartLine title="ROAS" data={data3}></ChartLine>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartLine title="CPA" data={data4}></ChartLine>
          </Card>
        </Col> */}

        <Col xs={24}>
          <Card className="card">
            {/* <Table<DataRow>
              className="table"
              dataSource={data.lines}
              pagination={false}
              rowKey={record => record._id.period_start}
              scroll={{x: true, y: 750 }}>
              {data.columns.map(({ align, dataIndex, key, title, width }: ColumnType<DataRow>, index) => (
                <Table.Column<DataRow>
                  align={align}
                  dataIndex={dataIndex}
                  key={index}
                  title={title}
                  width={width}
                />
              ))}
              </Table> */}

            <Table<DataRow>
              className="table"
              columns={data.columns}
              dataSource={data.lines}
              pagination={false}
              rowKey="periodF"
              scroll={{x: true, y: 800 }} />
          </Card>
        </Col>

        <Col xs={24}>
          <Title level={2} style={{ fontWeight: 'normal' }}>
            Store Insights
          </Title>
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

        {/* <Col md={24} lg={6}>
          <Card className="card">
            <ChartLine title="Conversion Rate" data={data8}></ChartLine>
          </Card>
        </Col>

        <Col md={24} lg={6}>
          <Card className="card">
            <ChartArea title="Abandonment Rate" data={data9}></ChartArea>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps = withAuth(async ({ ctx, user }: { ctx: GetServerSidePropsContext, user: any }) => {
  let from: string, to: string;

  try {
    from = ctx.query.from
    ? moment(ctx.query.from).startOf('day').format()
    : moment().startOf('day').subtract(6, 'months').format();
  } catch (e) {
    from = moment().startOf('day').subtract(6, 'months').format();
  }

  try {
    to = moment(ctx.query.to).startOf('day').format();
  } catch (e) {
    to = moment().endOf('day').format();
  }
  
  const params = { from, to };

  const data = await fetch(
    `/context/dashboard${buildQueryString(params)}`,
    null,
    ctx
  );

  if (data?.redirect) {
    return data;
  }

  return {
    props: {
      user,
      initialData: data,
      initialFrom: from,
      initialTo: to
    }
  };
});

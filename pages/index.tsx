import React from 'react'
import Head from 'next/head'
import { Card, Col, Row, DatePicker, Table, Typography } from 'antd'
import './index.less'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import fetch from '../lib/fetch'
import { withAuth } from '../lib/withAuth'
import { buildQueryString } from '../lib/buildQueryString'
import { useRouter } from 'next/router'
import moment from 'moment'
import { ColumnType } from 'antd/lib/table'
import { format } from '../lib/formatters'
import ChartCard from '../components/dashboard/ChartCard'

// WORKS with AntdDayjsWebpackPlugin that replaces moment.
// import 'dayjs/locale/zh-cn';
// moment.locale('zh-cn')
// console.log(moment().format('dddd'));

const { RangePicker } = DatePicker
const { Title } = Typography

type Row = {
  _id: { period_type: string; period_start: string }
  period: string
  turnover: number
  ad_spend: number
  purchases_total: number
  purchases_value_total: number
  roas: number
  cpa: number
  orders_count: number
  orders_avg_value: number
  topCountry: string
  conversion_rate: number
  abandonment_rate: number
  vat: number
  quantity: number
  profit: number
  profit_per_unit: number
}

type Props = {
  initialData: any
  initialFrom: string
  initialTo: string
}

const DashboardPage: NextPage<Props> = ({ initialData, initialFrom, initialTo }) => {
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

  // const data = initialData;
  const { data1, data2, data3, data4, data5, data6, data7 } = initialData.data || {}
  const [from, to] = [moment(initialFrom), moment(initialTo)]

  const router = useRouter()

  const onRangeChange = async ([from, to]: [moment.Moment, moment.Moment]): Promise<void> => {
    // fixme: should respect store timezone.
    const startOfFrom = from.startOf('day').format()
    const endOfTo = to.endOf('day').format()

    // WORKS with AntdDayjsWebpackPlugin that replaces moment.
    // import dayjs from 'dayjs'
    // import utc from 'dayjs/plugin/utc';
    // import timezone from 'dayjs/plugin/timezone';
    // dayjs.extend(utc);
    // dayjs.extend(timezone);
    // const now = dayjs();
    // const tz = 'America/New_York';
    // let test = now;
    // console.log(test, test.format());
    // test = dayjs.tz(now);
    // console.log(test, test.format());
    // test = dayjs.tz(now, tz);
    // console.log(test, test.format());
    // dayjs.tz.setDefault(tz);
    // test = dayjs.tz(now);
    // console.log(test, test.format());

    // WORKS when AntdDayjsWebpackPlugin not included.
    // import 'moment-timezone';
    // moment.tz.setDefault('America/New_York');
    // console.log(moment().format());

    // console.log('onRangeChange', from.format(), to.format(), startOfFrom, endOfTo);

    router.push({
      pathname: '/',
      query: {
        from: startOfFrom,
        to: endOfTo,
      },
    })
    // router.push(
    //   `test?from=${encodeURIComponent(from.startOf('day').format())}&to=${encodeURIComponent(to.endOf('day').format())}`,
    //   `test?from=${encodeURIComponent(from.startOf('day').format())}&to=${encodeURIComponent(to.endOf('day').format())}`,
    // );
  }

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
                // defaultValue={[from, to]}
                value={[from, to]}
                className="range-picker"
                onChange={onRangeChange}
                clearIcon={false}
              />
            </Col>
          </Row>
        </Col>

        {!initialData.data ? (
          'There is no data for the range picked.'
        ) : (
          <>
            <ChartCard serie={data1} />

            <ChartCard serie={data2} />

            <ChartCard serie={data3} />

            <ChartCard serie={data4} />

            <Col xs={24}>
              <Card className="card">
                <Table<Row>
                  className="table"
                  dataSource={data5.data}
                  pagination={false}
                  scroll={{ x: true, y: 750 }}
                >
                  {data5.columns.map(
                    ({ align, dataIndex, title, width }: ColumnType<Row>, index: number) => (
                      <Table.Column<Row>
                        align={align}
                        dataIndex={dataIndex}
                        key={index}
                        title={title}
                        width={width}
                        render={(value: any) =>
                          value ? format(data5.types[dataIndex as string], value) : null
                        }
                      />
                    )
                  )}
                </Table>

                {/* <Table<Row>
              className="table"
              columns={data5.columns}
              dataSource={data5.data.sort((a, b) =>
                a._id.period_start > b._id.period_start ? -1 : 1
              )}
              pagination={false}
              rowKey="period_f"
              scroll={{ x: true, y: 760 }}
              size="middle"
            /> */}
              </Card>
            </Col>

            <Col xs={24}>
              <Title level={2}>Store Insights</Title>
            </Col>

            <ChartCard serie={data6} />

            <ChartCard serie={data7} />

            {/* <ChartCard serie={data8} />

        <ChartCard serie={data9} /> */}
          </>
        )}
      </Row>
    </>
  )
}

export default DashboardPage

interface DashboardQueryParams {
  from?: string
  to?: string
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ ctx, user }: { ctx: GetServerSidePropsContext; user: any }) => {
    const { from = '', to = '' }: DashboardQueryParams = ctx.query

    const data = await fetch(`/context/dashboard${buildQueryString({ from, to })}`, null, ctx)

    if (data?.redirect) {
      return data
    }

    return {
      props: {
        user,
        initialData: data,
        initialFrom: data.from,
        initialTo: data.to,
      },
    }
  }
)

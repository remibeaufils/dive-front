import React from 'react'
import { Column } from '@ant-design/charts'
import moment from 'moment'
import './Chart.less'
import ChartEvolution from './ChartEvolution'

type Props = {
  data: any
  total: number
  evolution: string
  height?: number
  title?: string
  yLabel?: string
}

const ChartColumn: React.FC<Props> = ({
  data,
  evolution,
  height = 131,
  title,
  total,
  yLabel,
}: Props) => {
  const config = {
    data,
    // color: '#092292',
    color: '#7A18F6',
    xField: 'x',
    yField: 'y',
    meta: {
      y: { alias: yLabel },
    },
    xAxis: {
      // line: null,
      type: 'timeCat',
      label: {
        // formatter: (month: string) => month.substr(0,3)
        formatter: (x: string) => moment(x).format('MMM, DD'),
      },
    },
    yAxis: {
      grid: null,
      label: null,
    },
  }

  return (
    <>
      {/* <Title level={5} className="title">{title}</Title> */}
      <p className="title">{title}</p>
      <p className="total">
        {total}
        &nbsp;
        <ChartEvolution evolution={evolution} />
      </p>
      <Column height={height} {...config} />
    </>
  )
}

export default ChartColumn

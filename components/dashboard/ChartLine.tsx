import React from 'react'
import { Line } from '@ant-design/charts'
import { LineConfig } from '@ant-design/charts/es/line'
import { format } from '../../lib/formatters'
import ChartLegend from './ChartLegend'

type Props = {
  data: any
  total: number
  evolution: number
  height?: number
  title?: string
  xType?: string
  yLabel?: string
  yType?: string
}

const ChartLine: React.FC<Props> = ({
  data,
  evolution,
  height,
  title,
  total,
  xType,
  yLabel,
  yType,
}: Props) => {
  const config: LineConfig = {
    data,
    height: height || 131,
    smooth: true,
    // autoFit: false,
    xField: 'x',
    yField: 'y',
    meta: {
      x: { formatter: (val: string) => format(xType, val, true) },
      y: { alias: yLabel, formatter: (val: string) => format(yType, val) },
    },
    xAxis: {
      line: null,
      nice: true,
      // type: 'timeCat',
      label: {
        // autoHide: true, // default = true
        formatter: (x: string) => format(xType, x, true),
      },
    },
    yAxis: {
      grid: null,
      nice: true,
      label: null,
    },
    // color: '#092292',
    color: '#7A18F6',
    point: { size: 3, shape: 'circle', color: '#7A18F6' },
  }

  return (
    <>
      <ChartLegend evolution={evolution} title={title} total={total} yType={yType} />
      <Line {...config} />
    </>
  )
}

export default ChartLine

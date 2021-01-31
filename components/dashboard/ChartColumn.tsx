import React from 'react'
import { Column } from '@ant-design/charts'
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

const ChartColumn: React.FC<Props> = ({
  data,
  evolution,
  height = 131,
  title,
  total,
  xType,
  yLabel,
  yType,
}: Props) => {
  const config = {
    data,
    // color: '#092292',
    color: '#7A18F6',
    xField: 'x',
    yField: 'y',
    meta: {
      x: { formatter: (val: string) => format(xType, val, true) },
      y: { alias: yLabel, formatter: (val: string) => format(yType, val) },
    },
    xAxis: {
      nice: true,
      line: null,
      // type: 'timeCat',
      label: {
        // autoHide: true, // default = true
        formatter: (x: string) => format(xType, x, true),
      },
    },
    yAxis: {
      grid: null,
      label: null,
    },
  }

  return (
    <>
      <ChartLegend evolution={evolution} title={title} total={total} yType={yType} />
      <Column height={height} {...config} />
    </>
  )
}

export default ChartColumn

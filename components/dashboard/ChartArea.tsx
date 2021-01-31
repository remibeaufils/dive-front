import React from 'react'
import { Area } from '@ant-design/charts'
import { AreaConfig } from '@ant-design/charts/es/area'
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

const ChartArea: React.FC<Props> = ({
  data,
  evolution,
  height,
  title,
  total,
  xType,
  yLabel,
  yType,
}: Props) => {
  // https://g2.antv.vision/en/docs/manual/tutorial/scale
  const config: AreaConfig = {
    data,
    height: height || 131,
    // autoFit: true,
    smooth: true,
    xField: 'x',
    yField: 'y',
    meta: {
      x: { formatter: (val: string) => format(xType, val, true) },
      y: { alias: yLabel, formatter: (val: string) => format(yType, val) },
    },
    xAxis: {
      nice: true,
      line: null,
      // tickInterval: 3,
      // mask: 'YYYY-MM-DDTHH:MM:SSZ',
      // type: 'timeCat',
      // type: 'cat',
      label: {
        // autoHide: true, // default = true
        formatter: (x: string) => format(xType, x, true),
      },
    },
    yAxis: {
      grid: null,
      label: null,
    },
    color: '#7A18F6',
    point: { size: 3, shape: 'circle', color: '#7A18F6' },
    // areaStyle: () => ({ fill: 'l(270) 0:#ffffff 0.2:#7ec2f3 1:#2b8cff' })
    areaStyle: {
      fill: 'l(270) 0:rgba(122,24,246,0) 0.4:rgba(122,24,246,.56) 0.8361:rgba(122,24,246,1)',
      // fill: 'rgba(122,24,246,1)',
    },
  }

  return (
    <>
      <ChartLegend evolution={evolution} title={title} total={total} yType={yType} />
      <Area {...config} />
    </>
  )
}

export default ChartArea

import { Card, Col } from 'antd'
import React from 'react'
import ChartArea from './ChartArea'
import ChartColumn from './ChartColumn'
import ChartLine from './ChartLine'

type Serie = {
  type: string
  sizes: { md: number; sm: number; xs: number; xl: number }
  data: number
  evolution: number
  title: string
  total: number
  types: { x: string; y: string }
}

type Props = {
  serie: Serie
}

const ChartCard: React.FC<Props> = ({
  serie: {
    sizes: { md, sm, xs, xl },
    type,
    data,
    evolution,
    title,
    total,
    types,
  },
}: Props) => {
  const ChartType =
    type === 'area'
      ? ChartArea
      : type === 'line'
      ? ChartLine
      : type === 'column'
      ? ChartColumn
      : null

  if (!ChartType) return null

  return (
    <Col xs={xs} sm={sm} md={md} xl={xl}>
      <Card className="card">
        <ChartType
          data={data}
          total={total}
          evolution={evolution}
          title={title}
          xType={types.x}
          yLabel={title}
          yType={types.y}
        />
      </Card>
    </Col>
  )
}

export default ChartCard

import React from 'react'
import { format } from '../../lib/formatters'
import ChartEvolution from './ChartEvolution'
import './ChartLegend.less'

type Props = {
  evolution: number
  title: string
  total: number
  yType: string
}

const ChartLegend: React.FC<Props> = ({ evolution, title, total, yType }: Props) => {
  return (
    <>
      {/* <Title level={5} className="title">{title}</Title> */}
      <p className="title">{title}</p>
      <p className="total">
        {format(yType, total)}
        &nbsp;
        <ChartEvolution evolution={evolution} />
      </p>
    </>
  )
}

export default ChartLegend

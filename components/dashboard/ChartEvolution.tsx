import React from 'react'
import { Typography } from 'antd'
import './ChartEvolution.less'
import { format } from '../../lib/formatters'

const { Text } = Typography

type Props = {
  evolution: number
}

const ChartEvolution: React.FC<Props> = ({ evolution }: Props) => {
  if (!evolution) return null

  return (
    <Text className="evolution" type={evolution < 0 ? 'warning' : 'success'}>
      {evolution < 0 ? '-' : '+'}
      {format('percent', evolution)}
    </Text>
  )
}

export default ChartEvolution

import React from 'react'
import { Typography } from 'antd'
import './ChartEvolution.less'

const { Text } = Typography

type Props = {
  evolution: string
}

const ChartEvolution: React.FC<Props> = ({ evolution }: Props) => {
  if (['0', '0%'].includes(evolution)) return null

  return (
    <Text className="evolution" type={evolution.startsWith('-') ? 'warning' : 'success'}>
      {!evolution.startsWith('-') ? '+' : ''}
      {evolution}
    </Text>
  )
}

export default ChartEvolution

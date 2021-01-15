import React from 'react';
import { Line } from '@ant-design/charts';
import { Typography } from 'antd';
import moment from 'moment';
import "./Chart.less";
import { LineConfig } from '@ant-design/charts/es/line';

type Props = {
  data: any,
  height?: number,
  title?: string,
}

const ChartLine: React.FC<Props> = ({ data, height, title }: Props) => {
  const config: LineConfig = {
    data,
    height: height || 131,
    smooth: true,
    // autoFit: false,
    xField: 'x',
    yField: 'y',
    // meta: {
    //   y: { alias: 'yLabel' }
    // },
    xAxis: {
      line: null,
      label: {
        // autoHide: false,
        formatter: (x: string) => moment(x).format('MMM')
      },
    },
    yAxis: {
      grid: null,
      label: null
    },
    // color: '#092292',
    color: '#7A18F6',
    point: { size: 3, shape: 'circle', color: '#7A18F6' },
  };

  return (
    <>
      {/* <Title level={5} className="title">{title}</Title> */}
      <p className="title">{title}</p>
      <Line {...config}/>
    </>
  )
};

export default ChartLine;
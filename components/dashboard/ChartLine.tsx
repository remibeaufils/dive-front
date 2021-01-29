import React from 'react';
import { Line } from '@ant-design/charts';
import moment from 'moment';
import "./Chart.less";
import { LineConfig } from '@ant-design/charts/es/line';
import ChartEvolution from './ChartEvolution';

type Props = {
  data: any,
  total: number,
  evolution: string,
  height?: number,
  title?: string,
  yLabel?: string,
}

const ChartLine: React.FC<Props> = ({ data, evolution, height, title, total, yLabel }: Props) => {
  const config: LineConfig = {
    data,
    height: height || 131,
    smooth: true,
    // autoFit: false,
    xField: 'x',
    yField: 'y',
    meta: {
      y: { alias: yLabel }
    },
    xAxis: {
      type: 'timeCat',
      line: null,
      nice: true,
      label: {
        // autoHide: false,
        formatter: (x: string) => moment(x).format('MMM, DD')
      },
    },
    yAxis: {
      grid: null,
      nice: true,
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
      <p className="total">
        {total}
        &nbsp;
        <ChartEvolution evolution={evolution}/>
      </p>
      <Line {...config}/>
    </>
  )
};

export default ChartLine;
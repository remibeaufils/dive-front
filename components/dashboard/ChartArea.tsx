import React from 'react';
import { Area } from '@ant-design/charts';
import { AreaConfig } from '@ant-design/charts/es/area';
import moment from 'moment';
import "./Chart.less";
import ChartEvolution from './ChartEvolution';

type Props = {
  data: any,
  total: number,
  evolution: string,
  height?: number,
  title?: string,
  yLabel?: string,
}

const ChartArea: React.FC<Props> = ({ data, evolution, height, title, total, yLabel }: Props) => {
  // https://g2.antv.vision/en/docs/manual/tutorial/scale
  const config: AreaConfig = {
    data,
    height: height || 131,
    // autoFit: true,
    smooth: true,
    xField: 'x',
    yField: 'y',
    meta: {
      y: { alias: yLabel }
    },
    xAxis: {
      // tickInterval: 3,
      // mask: 'YYYY-MM-DDTHH:MM:SSZ',
      type: 'timeCat',
      // type: 'cat',
      nice: true,
      line: null,
      label: {
        // autoHide: true, // default = true
        formatter: (x: string) => moment(x).format('MMM, DD')
      },
    },
    yAxis: {
      grid: null,
      label: null
    },
    color: '#7A18F6',
    point: { size: 3, shape: 'circle', color: '#7A18F6' },
    // areaStyle: () => ({ fill: 'l(270) 0:#ffffff 0.2:#7ec2f3 1:#2b8cff' })
    areaStyle: {
      fill: 'l(270) 0:rgba(122,24,246,0) 0.4:rgba(122,24,246,.56) 0.8361:rgba(122,24,246,1)',
      // fill: 'rgba(122,24,246,1)',
    }
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
      <Area {...config}/>
    </>
  )
};

export default ChartArea;
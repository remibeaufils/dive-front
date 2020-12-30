import React from 'react';
import { Area } from '@ant-design/charts';
import { Typography } from 'antd';
import { AreaConfig } from '@ant-design/charts/es/area';
import moment from 'moment';
import "./Chart.less";

const { Title } = Typography;

type Props = {
  data: any,
  height?: number,
  title?: string,
}

const ChartArea: React.FC<Props> = ({ data, height, title }: Props) => {
  const config: AreaConfig = {
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
    color: '#092292',
    point: { size: 3, shape: 'circle', color: '#092292' },
    areaStyle: () => ({ fill: 'l(270) 0:#ffffff 0.2:#7ec2f3 1:#2b8cff' })
  };

  return (
    <>
      {/* <Title level={5} className="title">{title}</Title> */}
      <p className="title">{title}</p>
      <Area {...config}/>
    </>
  )
};

export default ChartArea;
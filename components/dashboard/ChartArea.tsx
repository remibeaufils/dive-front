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
      label: null,
      // label: {
      //   autoHide: true,
      //   // formatter: (x: string) => moment(x).format('MMM')
      //   formatter: (x: string) => x.substring(0, 3)
      // },
    },
    yAxis: {
      grid: null,
      label: null
    },
    // color: '#092292',
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
      <Area {...config}/>
    </>
  )
};

export default ChartArea;
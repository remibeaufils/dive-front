import React from 'react';
import { Column } from '@ant-design/charts';
import { Typography } from 'antd';
import "./Chart.less";

const { Title } = Typography;

type Props = {
  data?: any,
  height?: number,
  title?: string,
  xLabel?: string,
  yLabel?: string,
}

const ChartColumn: React.FC<Props> = ({ data, height = 131, title, xLabel, yLabel }: Props) => {
  const config = {
    data,
    color: '#092292',
    xField: 'x',
    yField: 'y',
    meta: {
      x: { alias: xLabel },
      y: { alias: yLabel }
    },
    xAxis: {
      line: null,
      label: {
        // autoHide: false,
        // formatter: (month: string) => month.substr(0,3)
      },
    },
    yAxis: {
      grid: null,
      label: null
    }
  };

  return (
    <>
      {/* <Title level={5} className="title">{title}</Title> */}
      <p className="title">{title}</p>
      <Column height={height} {...config}/>
    </>
  );
};

export default ChartColumn;
import React, { useRef } from 'react';
import { Area } from '@ant-design/charts';
import { Typography } from 'antd';
import { AreaConfig } from '@ant-design/charts/es/area';
import "./Chart.less";

const { Title } = Typography;

type Props = {
  data: any,
  height?: number,
  title?: string,
}

const ChartArea: React.FC<Props> = ({ data, height, title }: Props) => {
  const ref = useRef();

  const downloadImage = () => {
    ref?.current?.downloadImage();
    // @ts-ignore: Object is possibly 'null'.
    // https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
  };

  const toDataURL = () => {
    console.log(ref?.current?.toDataURL());
  };

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
      line: null
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
      {/* <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        downloadImage
      </button>
      <button type="button" onClick={toDataURL}>
        toDataURL
      </button> */}
      <Area {...config} chartRef={ref} />
    </>
  )
};

export default ChartArea;
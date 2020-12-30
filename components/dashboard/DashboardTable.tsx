import React from 'react';
import { Table } from 'antd';

type Props = {
  columns: [],
  data: []
}

const DashboardTable: React.FC<Props> = (props) => {
  return (
    <Table
      className="table"
      columns={props.columns}
      dataSource={props.data}
      pagination={false}
      scroll={{x: true}}/>
  );
};

export default DashboardTable;
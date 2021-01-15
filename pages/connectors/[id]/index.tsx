import { Button, Card, Col, Row, Table } from 'antd';
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { withAuth } from '../../../lib/withAuth';
import fetch from '../../../lib/fetch';

type Props = {
  connector: any,
  data: any,
};

const columns = [
  {
    title: 'date_start',
    dataIndex: 'date_start',
    key: 'date_start',
  },
  {
    title: 'date_stop',
    key: 'date_stop',
    dataIndex: 'date_stop'
  },
  {
    title: 'cpc',
    dataIndex: 'cpc',
    key: 'cpc',
  },
  {
    title: 'spend',
    key: 'spend',
    dataIndex: 'spend'
  },
  {
    title: 'account_currency',
    dataIndex: 'account_currency',
    key: 'account_currency'
  },
];

const ConnectorPage: NextPage<Props> = ({ connector, data }) => {
  const { id, url, title, icon, configured, adAccounts } = connector;

  const removeConnection = async () => {
    const data = await fetch(
      `/connectors/${id}`,
      { method: 'DELETE' }
    );

    window.location.reload();
  };

  return (
    <>
      <Row gutter={16}>
        {!configured && <Col span={24}>
          <div>
            {/* https://www.facebook.com/dialog/oauth?client_id=375201146016366&display=popup&redirect_uri=https%3A%2F%2Fapp.glew.io%2Fapi%2Fintegration%2Ffacebook%2Fredirect&response_type=code&scope=ads_read%2Cbusiness_management&state=eyJ1dWlkIjoiZGFiNzQzZGE3YjUzYTMzMzBkZWMyMjU0MjRlODczYmUiLCJ1cmwiOiJodHRwczovL2FwcC5nbGV3LmlvL2FwaS9pbnRlZ3JhdGlvbi9mYWNlYm9vay9vYTJjYiJ9 */}
            <a href={url}>
              <Card className="card">
                <img src={icon} alt="" style={{ height: 24, paddingRight: 8 }}/>
                {title}
              </Card>
            </a>
          </div>
        </Col>}
        
        {adAccounts && adAccounts.map(({business_name, name, account_id, insights}, index: number) => (
          <Col span={24} key={index}>
            <Card className="card">
              <p>
                <strong>{business_name}</strong> - {name} ({account_id})
              </p>
              <Table
                className="table"
                columns={columns}
                dataSource={insights}
                rowKey="date_start" 
                pagination={false}
                scroll={{x: true}}/>
            </Card>
          </Col>
        ))}
        
        {configured && (
          <Col span={24}>
            <Card className="card" style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={removeConnection}>Remove Connection</Button>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ConnectorPage;

export const getServerSideProps = withAuth(async ({ ctx, user }: { ctx: GetServerSidePropsContext, user: any }) => {
  const data = await fetch(
    `/connectors/${ctx.query.id}`,
    null,
    ctx
  );

  if (data?.redirect) {
    return data;
  }

  return { props: { user, connector: data } };
});


// https://www.facebook.com/v8.0/dialog/oauth?response_type=code&client_id=2852149821666336&redirect_uri=https%3A%2F%2Fapp.polaranalytics.co%2Ffacebook%2Fcallback&scope=ads_read&state=vFNbDYFuuGcNf6OAJEroyXZmc7zNhJ&ret=login&fbapp_pres=0&logger_id=6b4d2f49-e627-4e7d-9905-da0ea09da701&tp=unspecified&cbt=1610488326789&ext=1610491952&hash=AeadF4w35Pmp2ByP46k

// https://app.polaranalytics.co/facebook/callback?code=AQD-JUf5uRbP-eQ2z00QWj_QkLeR3BDbfW-QR6JWOBIjz5bL3TytkigEwxbxZ5QtEkoLnHllqA1dNKO1cOg0-2ZMSl03TeUPolj5FEa9Btyon5HbOz57zW9u0A1FO-wdOLGpPBCCL18A-9N5KfTvw1w6T4fBgc_avEEjGToqAxM28Sq5KjNejEWgYLDC5BzBFqBSm6im3J15SrBeRkRPcjbKxIYLZTCHtnOeU5vF-FTrA0jTfuhvCE0cdXNUMokzF_jW41t-GN6jZT2GYvgye_2ktEAxJmBuvT4kj9c3Ql1xYhOkdu59IBVN2Ld4FrXNWMYdLKYey_oJl675e6j3DhSW0xrAIhAbK0PWZrOeZbixSA&state=vFNbDYFuuGcNf6OAJEroyXZmc7zNhJ#_=_


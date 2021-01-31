import { Card, Col, Row } from 'antd'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import fetch from '../../lib/fetch'
import { withAuth } from '../../lib/withAuth'

type Props = {
  connectors: any[]
}

const ConnectorsPage: NextPage<Props> = ({ connectors }) => {
  return (
    <Row gutter={16}>
      {connectors.map(({ id, name, icon }) => (
        <Col span={6} key={id}>
          <div>
            <Link href={`/connectors/${id}`}>
              <a>
                <Card className="card">
                  <p>
                    {icon && <img src={icon} alt="" style={{ height: 24, paddingRight: 8 }} />}
                    {name}
                  </p>
                  {/* <p><Text type="secondary">Grant Dive access</Text></p> */}
                </Card>
              </a>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default ConnectorsPage

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ ctx, user }: { ctx: GetServerSidePropsContext; user: any }) => {
    console.log('ConnectorsPage getServerSideProps', ctx.query)

    const data = await fetch('/connectors', null, ctx)

    if (data?.redirect) {
      return data
    }

    return { props: { user, connectors: data } }
  }
)

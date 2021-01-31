import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { isLoggedin } from '../../lib/auth'
import { redirect } from '../../lib/redirect'
import './Login.less'
import Title from 'antd/lib/typography/Title'

export type LoginInputs = {
  email?: string
  password?: string
}

const LoginPage: NextPage<void> = () => {
  // const [message, setMessage] = useState(null)

  const router = useRouter()

  const onFinish = async (values: LoginInputs): Promise<void> => {
    const response = await global.fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })

    // const data = await response.json()

    // setMessage(data)

    if (!response.ok) {
      return
    }

    // Before redirecting to requested page => need to get the AUTH token present in cookie and set it in App context to make user data available.

    // Read a HttpOnly cookie client side = not possible.

    router.replace((router.query.page_requested as string) || '/')

    // So => navigate reloading page to get AUTH cookie server side.
    // window.location.href = (router.query.page_requested as string) || '/';

    // À voir si nécéssaire si getServerSideProps utilisé dans tous les composants private car ça force le ssr.
  }

  return (
    <div className="container">
      <Card className="login-card">
        <Title level={2} style={{ marginBottom: '56px', textAlign: 'center' }}>
          Login
        </Title>

        <Form
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage

// export const getServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ): Promise<GetServerSidePropsResult<any>> => {
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log('LoginPage getServerSideProps');

  if (isLoggedin(ctx)) {
    // console.log('LOGIN REDIRECT');
    redirect('/', ctx)
  } else {
    // console.log('LOGIN NO REDIRECT');
    return { props: {} }
  }
}

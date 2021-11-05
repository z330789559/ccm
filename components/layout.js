import { useEffect, useContext } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Styled from 'styled-components'
import { Layout } from 'antd'
import { MyContext } from '../reducer'
import { injectIntl } from 'react-intl'

const LayoutOne = injectIntl(({ children, intl }) => {
  let timer = 0
  const { state, dispatch } = useContext(MyContext)

  useEffect(() => {
    dispatch({ type: 'SET_WINDOW', data: window.screen.availWidth })
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleWindowResize = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({ type: 'SET_WINDOW', data: window.screen.availWidth })
    }, 100)
  }

  return (
    <>
      <Head>
        <title>CCM {intl.messages.lang62}</title>
      </Head>
      <Header />
      <Layout
        style={{
          minHeight: 'calc(100% - 258px)',
          paddingTop: state > 1199 ? 105 : 150,
          margin: '0 auto',
          background: 'inherit'
        }}
      >
        <Content state={state}>{children}</Content>
      </Layout>
      <Footer />
    </>
  )
})
const Content = Styled.div`
  background: rgb(246, 246, 246);
  height: 100%;
  display: block;
  width: ${(props) => (props.state.window > 1199 ? '1200px' : '92vw')};
  margin: 0px auto 20px;
`
export default LayoutOne

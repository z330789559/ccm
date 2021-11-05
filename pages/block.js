import Styled from 'styled-components'
import Layout from '../components/layout'
import Grid from '../components/table/Grid'
import { OrderedListOutlined } from '@ant-design/icons'
import { injectIntl } from 'react-intl'
import { getDuration } from '../utils/date'
import Link from 'next/link'

const Block = injectIntl(({ intl }) => {
  const columns = [
    {
      title: intl.messages.lang19,
      dataIndex: 'number',
      width: '10%',
      render: (text) => (
        <Link href={`/block/${text}`} as={`/block/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang20,
      dataIndex: 'miner',
      h5: true,
      ellipsis: {
        showTitle: true
      },
      render: (text) => (
        <Link href={`/addr/${text}`} as={`/addr/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang21,
      dataIndex: 'timestamp',
      h5: true,
      width: '30%',
      render: (text) => getDuration(text, intl.locale, 3).toString()
    },
    {
      title: intl.messages.lang6,
      dataIndex: 'txn',
      h5: true,
      width: '10%',
      render: (text, data) => (
        <Link href={`/trade/number/${data.number}`} as={`/trade/number/${data.number}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang22,
      dataIndex: 'size',
      width: '10%'
    }
  ]

  return (
    <Layout>
      <Box>
        <div className="title">
          <OrderedListOutlined /> {intl.messages.lang18}
        </div>
        <Grid url={`/api/block`} columns={columns} />
      </Box>
    </Layout>
  )
})

const Box = Styled.div`
.title{
  line-height: 30px;
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  font-weight: 600;
  align-items: center;
  display: flex;
  .anticon {
    margin-right:10px;
  }
  em{
    color:#40a9ff;
    margin: 0 8px;
  }
}

`

export default Block

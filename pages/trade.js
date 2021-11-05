import Styled from 'styled-components'
import Layout from '../components/layout'
import Grid from '../components/table/Grid'
import { OrderedListOutlined } from '@ant-design/icons'
import { injectIntl } from 'react-intl'
import { getDuration } from '../utils/date'
import { handleGetFee } from '../utils/common'
import Link from 'next/link'

const Block = injectIntl(({ intl }) => {
  const columns = [
    {
      title: intl.messages.lang23,
      dataIndex: 'blockHash',
      ellipsis: {
        showTitle: true
      },
      render: (text, row) => (
        <Link href={`/hash/${row.hash}`} as={`/hash/${row.hash}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang19,
      dataIndex: 'blockNumber',
      ellipsis: {
        showTitle: true
      },
      render: (text) => (
        <Link href={`/block/${text}`} as={`/block/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang21,
      dataIndex: 'timestamp',
      h5: true,
      ellipsis: {
        showTitle: true
      },
      render: (text) => getDuration(text, intl.locale, 3).toString()
    },
    {
      title: intl.messages.lang24,
      ellipsis: {
        showTitle: true
      },
      dataIndex: 'from',
      h5: true,
      render: (text) => (
        <Link href={`/addr/${text}`} as={`/addr/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang25,
      ellipsis: {
        showTitle: true
      },
      h5: true,
      dataIndex: 'to',
      render: (text, data) =>
        data.value === '0' ? (
          <Link href={`/addr/0x${data.input?.substring(34, 74)}`} as={`/addr/0x${data.input?.substring(34, 74)}`}>
            <a className="a_block">0x{data.input?.substring(34, 74)}</a>
          </Link>
        ) : (
          <Link href={`/addr/${text}`} as={`/addr/${text}`}>
            <a className="a_block">{text}</a>
          </Link>
        )
    },
    {
      title: intl.messages.lang26,
      dataIndex: 'value',
      render: (text) => `${text} CCM`
    },
    {
      title: intl.messages.lang27,
      dataIndex: 'fee',
      render: (text, data) => handleGetFee(data.gasUsed * data.gasPrice, 18)
    }
  ]

  return (
    <Layout>
      <Box>
        <div className="title">
          <OrderedListOutlined /> {intl.messages.lang9}
        </div>
        <Grid url={'/api/trade'} columns={columns} />
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

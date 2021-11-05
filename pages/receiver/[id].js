import { useState, useEffect, useContext } from 'react'
import Styled from 'styled-components'
import Layout from '../../components/layout'
import { Select } from 'antd'
import Grid from '../../components/table/Grid'
import { injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import http from '../../utils/http'
import { getDuration } from '../../utils/date'
import BigNumber from 'bignumber.js'
import { handleGetFee } from '../../utils/common'
import { MyContext } from '../../reducer'
import Link from 'next/link'

const RsTabs = ({ intl, id }) => {
  const [tradeKey, setTradeKey] = useState('all')

  let columns = [
    {
      title: intl.messages.lang23,
      dataIndex: 'hash',
      ellipsis: {
        showTitle: true
      },
      render: (text) => (
        <Link href={`/hash/${text}`} as={`/hash/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang19,
      width: 120,
      dataIndex: 'blockNumber',
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
      dataIndex: 'to',
      h5: true,
      render: (text, data) => {
        const addr = `0x${data.input.substring(34, 74)}`
        return (
          <Link href={`/addr/${addr}`} as={`/addr/${addr}`}>
            <a className="a_block">
              <span className={data.from === id ? 'out' : 'in'}>{data.from === id ? 'OUT' : 'IN'}</span>
              {addr}
            </a>
          </Link>
        )
      }
    },
    {
      title: intl.messages.lang54,
      ellipsis: {
        showTitle: true
      },
      dataIndex: 'a8',
      render: (text, data) => (data.decimals !== undefined ? handleGetFee(new BigNumber(Number(`0x${data.input.substring(114)}`)).toFixed(), data.decimals) : '')
    },
    {
      title: intl.messages.lang26,
      dataIndex: 'a7',
      ellipsis: {
        showTitle: true
      },
      h5: true,
      render: (text, data) =>
        data.decimals !== undefined ? `${handleGetFee(new BigNumber(Number(`0x${data.input.substring(114)}`)).toFixed(), data.decimals)} (${data.symbol})` : ''
    }
  ]

  return (
    <div className="rs-addr-tab">
      <div className="rs-addr-select">
        <Select defaultValue={tradeKey} style={{ width: 200 }} size="small" onChange={(val) => setTradeKey(val)}>
          <Select.Option value="all">{intl.messages.lang9}</Select.Option>
          <Select.Option value="in">{intl.messages.lang42}</Select.Option>
          <Select.Option value="out">{intl.messages.lang41}</Select.Option>
        </Select>
      </div>
      <Grid scroll={{ y: 1000 }} otherParam={`&trade=${tradeKey}`} url={`/api/receiver/list/${id}`} columns={columns} />
    </div>
  )
}

const Hash = injectIntl(({ router, intl }) => {
  const [receiver, setRecriver] = useState({})
  const { state } = useContext(MyContext)

  useEffect(() => {
    http.get(`/api/receiver/info/${id}`).then((data) => {
      setRecriver(data)
    })
  }, [])

  const id = router.query.id
  return (
    <Layout>
      <Box state={state}>
        <div className="rs-receiver-head">
          <em>{intl.messages.lang35}</em>
          {id}
        </div>
        <div className="rs-receiver-list">
          <div className="rs-receiver-li">
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang55}:</em>
              <div className="cont">{receiver.tokenName}</div>
            </div>
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang50}:</em>
              <div className="cont">{receiver.symbol}</div>
            </div>
          </div>
          <div className="rs-receiver-li">
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang51}:</em>
              <div className="cont">{receiver.totalSupply && handleGetFee(new BigNumber(receiver.totalSupply).toFixed(), receiver.decimals)}</div>
            </div>
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang52}:</em>
              <div className="cont">{receiver.decimals}</div>
            </div>
          </div>
          <div className="rs-receiver-li">
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang53}:</em>
              <div className="cont">{receiver.owner}</div>
            </div>
            <div className="rs-receiver-li-l">
              <em>{intl.messages.lang43}:</em>
              <div className="cont">{receiver.creationTra || receiver.creationTransaction}</div>
            </div>
          </div>
        </div>
        <RsTabs intl={intl} id={id} />
      </Box>
    </Layout>
  )
})

const Box = Styled.div`

.rs-receiver-head{
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 4px;
  background: #fff;
  padding: 0 10px;
  em{
    margin-right: 10px;
    font-weight: 600;
  }
}

.rs-receiver-list{
  background: #fff;
  border-radius: 2px;
  margin-top:20px;
  .rs-receiver-li{
    display: flex;
    align-items: center;
    flex-wrap:${(props) => (props.state.window > 1199 ? 'nowrap' : 'wrap')};
    padding: 0 14px;
    height: ${(props) => (props.state.window > 1199 ? '50px' : 'auto')};
    &:first-child{
      .rs-receiver-li-l{
        &:first-child{
          border-top:none;
        }
      }
    }
    &:nth-child(even){
      background: ${(props) => (props.state.window > 1199 ? 'rgb(248,248,248)' : 'inherit')};
    }
    .rs-receiver-li-l{
      border-top: ${(props) => (props.state.window > 1199 ? 'none' : '1px solid #eee')};
      width:${(props) => (props.state.window > 1199 ? '50%' : '100%')};
      padding-right:10px;
      display: flex;
      align-items: center;
      height:50px;
      > em{
        width:${(props) => (props.state.window > 1199 ? '100px' : 'auto')};
        padding-right:${(props) => (props.state.window > 1199 ? '0' : '10px')};
        font-family:"Arial";
      }
      .cont{
        flex:1;
        color: #333;
        font-weight: 100;
        font-family: Arial;
        font-style: normal;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
    }
  }
}
  .rs-addr-tab{
    margin-top:20px;
    background: #fff;
    .rs-addr-select{
      background: rgba(250,250,250,0.5);
      height:40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
    }
  }
`

export default withRouter(Hash)

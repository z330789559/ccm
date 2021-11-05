import { useState, useEffect, useContext } from 'react'
import Styled from 'styled-components'
import Layout from '../../components/layout'
import { Select, Tabs } from 'antd'
import Grid from '../../components/table/Grid'
import { injectIntl } from 'react-intl'
import Router, { withRouter } from 'next/router'
import http from '../../utils/http'
import { getDuration } from '../../utils/date'
import { handleGetFee, formatDataNumber } from '../../utils/common'
import Link from 'next/link'
import { MyContext } from '../../reducer'
import BigNumber from 'bignumber.js'

const RsTabs = injectIntl(({ intl, type, url, id }) => {
  const [tradeKey, setTradeKey] = useState('all')
  let columns = [
    {
      title: intl.messages.lang23,
      dataIndex: 'hash',
      ellipsis: true,
      render: (text, row) => (
        <Link href={`/hash/${row.hash}`} as={`/hash/${row.hash}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang19,
      width: 100,
      dataIndex: 'blockNumber',
      render: (text, row) => (
        <Link href={`/block/${text}`} as={`/block/${text}`}>
          <a className="a_block">{text}</a>
        </Link>
      )
    },
    {
      title: intl.messages.lang21,
      ellipsis: true,
      h5: true,
      dataIndex: 'timestamp',
      render: (text) => getDuration(text, intl.locale, 3).toString()
    },
    {
      title: intl.messages.lang24,
      ellipsis: true,
      h5: true,
      dataIndex: 'from',
      render: (text, data) => {
        return text === id ? (
          text
        ) : (
          <Link href={`/addr/${text}`} as={`/addr/${text}`}>
            <a className="a_block">{text}</a>
          </Link>
        )
      }
    },
    {
      title: intl.messages.lang25,
      ellipsis: true,
      dataIndex: 'to',
      h5: true,
      render: (text, data) => handleRturnTo(text, data)
    }
  ]
  if (type === 'trade') {
    columns = columns.concat([
      {
        title: intl.messages.lang26,
        ellipsis: true,
        width: 120,
        dataIndex: 'value',
        render: (text) => text + ' CCM'
      },
      {
        title: intl.messages.lang27,
        dataIndex: 'a7',
        h5: true,
        render: (text, data) => handleGetFee(data.gasUsed * data.gasPrice, 18)
      }
    ])
  } else {
    columns = columns.concat([
      {
        title: intl.messages.lang54,
        ellipsis: true,
        dataIndex: 'a8',
        width: 120,
        h5: true,
        render: (text, data) => (data.decimals !== undefined ? handleGetFee(new BigNumber(Number(`0x${data.input.substring(114)}`)).toFixed(), data.decimals) : '')
      },
      {
        title: intl.messages.lang26,
        ellipsis: true,
        dataIndex: 'a9',
        render: (text, data) =>
          data.decimals !== undefined ? `${handleGetFee(new BigNumber(Number(`0x${data.input.substring(114)}`)).toFixed(), data.decimals)} (${data.symbol})` : ''
      }
    ])
  }

  const handleRturnTo = (text, data) => {
    if (text) {
      if (text !== id && data.value === '0') {
        return (
          <Link href={`/receiver/${text}`} as={`/receiver/${text}`}>
            <a className="a_block">
              <span className={data.from?.toLocaleLowerCase() === id.toLocaleLowerCase() ? 'out' : 'in'}>
                {data.from.toLocaleLowerCase() === id.toLocaleLowerCase() ? 'OUT' : 'IN'}
              </span>
              {text}
            </a>
          </Link>
        )
      } else {
        return (
          <span className="a_block default">
            <span className={data.from?.toLocaleLowerCase() === id.toLocaleLowerCase() ? 'out' : 'in'}>
              {data.from.toLocaleLowerCase() === id.toLocaleLowerCase() ? 'OUT' : 'IN'}
            </span>
            {text}
          </span>
        )
      }
    } else {
      return intl.messages.lang58
    }
  }

  return (
    <div className="rs-addr-tab">
      {type === 'trade' && (
        <div className="rs-addr-select">
          <Select defaultValue={tradeKey} style={{ width: 200 }} size="small" onChange={(val) => setTradeKey(val)}>
            <Select.Option value="all">{intl.messages.lang9}</Select.Option>
            <Select.Option value="in">{intl.messages.lang42}</Select.Option>
            <Select.Option value="out">{intl.messages.lang41}</Select.Option>
          </Select>
        </div>
      )}
      <Grid scroll={{ y: 1000 }} otherParam={`&trade=${tradeKey}`} url={url} columns={columns} />
    </div>
  )
})

const Addr = injectIntl(({ intl, router }) => {
  const { state } = useContext(MyContext)
  const id = router.query.id
  const [addr, setAddr] = useState({})
  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    http.get(`/api/addr/info/${id}`, (data) => {
      setAddr(data)
    })
  }, [])

  useEffect(() => {
    if (addr?.token && isFirst) {
      setIsFirst(false)
      addr.token.forEach((item, index) => {
        http.get(`/api/addr/token/balance?address=${id}&contractaddress=${item.address}&decimals=${item.decimals}`).then((data) => {
          addr.token[index].balance = new BigNumber(data || 0).toFixed()
          setAddr({ ...addr })
        })
      })
    }
  }, [addr, isFirst])

  const handleChange = (val) => {
    Router.push(`/receiver/${val}`)
  }

  return (
    <Layout>
      <Box state={state}>
        <div className="rs-addr-title">
          <span>{intl.messages.lang35}</span>
          {id}
        </div>
        <div className="rs-addr-info">
          <div className="title">{intl.messages.lang36}</div>
          <div className="rs-addr-info-details">
            <em>{intl.messages.lang37}</em>
            <div>{formatDataNumber(addr.balance || '0')}</div>
          </div>
          <div className="rs-addr-info-details">
            <em>{intl.messages.lang32}</em>
            <div>{addr.tradeNumber}</div>
          </div>
          <div className="rs-addr-info-details">
            <em>{intl.messages.lang57}</em>
            <div className="rs-addr-select-cont">
              <Select
                showSearch
                filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.symbol.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder={intl.messages.lang39}
                style={{ width: '100%' }}
                onChange={(val) => handleChange(val)}
              >
                {addr.token?.map((item, index) => (
                  <Select.Option value={item.address} key={item.address} symbol={item.symbol}>
                    <div className="rs-addr-select-token">
                      <span className="an">{item.address}</span>
                      <span>{item.symbol}</span>
                    </div>
                    <div className="rs-addr-select-token">
                      <span className="an">{intl.messages.lang38}</span>
                      <span>{formatDataNumber(item.balance || '0')}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <AddrTab>
          <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab={intl.messages.lang6} key="1">
              <RsTabs type="trade" url={`/api/addr/info/trade/${id}`} id={id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.messages.lang40} key="2">
              <RsTabs type="coinCode" url={`/api/addr/info/tokenTrade/${id}`} id={id} />
            </Tabs.TabPane>
          </Tabs>
        </AddrTab>
      </Box>
    </Layout>
  )
})

const Box = Styled.div`
  .rs-addr-title{
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 4px;
    background: #fff;
    padding: 0 10px;
    span{
      margin-right:10px;
      font-weight:600;
    }
  }
  .rs-addr-info{
    margin-top:20px;
    background: #fff;
    padding: 0 10px;
    border-radius:4px;
    .title{
      height:45px;
      line-height:45px;
      font-weight:600;
      border-bottom:1px solid #eee;
    }
    .rs-addr-info-details{
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom:1px solid #eee;
      em{
        width:${(props) => (props.state.window > 1199 ? '150px' : '')};
        padding-right:${(props) => (props.state.window > 1199 ? '0' : '10px')};
      }
      >div{
        flex:1;
      }
    }
    .rs-addr-select-cont{
      width:100%;
    }
  }

`

const AddrTab = Styled.div`
  margin-top:20px;
  background: #fff;
  .rs-addr-tab{
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
export default withRouter(Addr)

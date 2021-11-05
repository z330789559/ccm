import { useState, useEffect, useContext } from 'react'
import Styled from 'styled-components'
import Layout from '../components/layout'
import { BlockOutlined, RadarChartOutlined } from '@ant-design/icons'
import http, { fetch } from '../utils/http'
import { Button } from 'antd'
import { getDuration } from '../utils/date'
import { injectIntl } from 'react-intl'
import Chart from 'chart.js'
import Link from 'next/link'
import { MyContext } from '../reducer'

const Title = injectIntl(({ intl, type, refresh }) => {
  const [blockLoading, setBlockLoading] = useState(false)
  const [tradeLoading, setTradeLoading] = useState(false)
  const handeRefresh = async () => {
    if (type === 'block') {
      setBlockLoading(true)
      refresh(await handleGetBlock(false))
      setBlockLoading(false)
    } else {
      setTradeLoading(true)
      refresh(await handleGetTrade(false))
      setTradeLoading(false)
    }
  }
  return (
    <CTitle>
      <div className="title">
        <span>
          {type === 'block' ? <BlockOutlined /> : <RadarChartOutlined />}
          {type === 'block' ? <em>{intl.messages.lang8}</em> : <em>{intl.messages.lang56}</em>}
        </span>
        <div className="rs-home-block-top">
          <Button loading={(type === 'block' && blockLoading) || (type === 'trade' && tradeLoading)} size="small" type="primary" onClick={() => handeRefresh()}>
            {intl.messages.lang12}
          </Button>
          <Button size="small" style={{ marginLeft: 10 }} type="primary" href={type === 'block' ? '/block' : '/trade'}>
            {intl.messages.lang13}
          </Button>
        </div>
      </div>
    </CTitle>
  )
})

const Index = injectIntl(({ info, intl, block, trade, lang }) => {
  const { state } = useContext(MyContext)
  const [blockList, setBlockList] = useState(block)
  const [tradeList, setTradeList] = useState(trade)
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    http.get('/api/home/charts', (data) => {
      setChartData(data)
    })
  }, [])

  useEffect(() => {
    if (chartData.length) {
      handleChange()
    }
  }, [chartData])

  const handleChange = () => {
    var options = {
      legend: { display: false },
      maintainAspectRatio: true,
      // responsive: false,
      // spanGaps: false,
      elements: {
        line: {
          tension: 0.000001
        }
      },
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              // autoSkip: false,
              maxRotation: 0
            }
          }
        ]
      }
    }
    const ccmChart = document.getElementById('ccmChart').getContext('2d')
    ccmChart.canvas.height = 160
    new Chart(ccmChart, {
      type: 'line',
      data: {
        labels: chartData.map((item) => `${item._id.mmonth} - ${item._id.day}`),
        datasets: [
          {
            backgroundColor: '#8bc7ff',
            borderColor: '#1890ff',
            data: chartData.map((item) => item.count),
            fill: 'start',
            label: ''
          }
        ]
      },
      options: options
    })
  }

  return (
    <Layout>
      <CcInfo state={state}>
        <div className="rs-home-info">
          <div className="title">CCM</div>
          <div className="rs-home-price">
            $ {info.last}
            <span className={info.change >= 0 ? '' : 'font-red'}>
              {info.change >= 0 ? '+' : ''}
              {info.change}%
            </span>
          </div>
          <div className="rs-home-info-list">
            <span>{intl.messages.lang10}</span>
            <em>{info.vol}</em>
          </div>
          <div className="rs-home-info-list">
            <span>{intl.messages.lang8}</span>
            <em>{info.block}</em>
          </div>
          <div className="rs-home-info-list">
            <span>{intl.messages.lang11}</span>
            <em>{info.tradeNumber}</em>
          </div>
        </div>
        <div className="rs-home-tr">
          <div className="title">{intl.messages.lang6}</div>
          <canvas id="ccmChart" style={{ width: '100%' }}></canvas>
        </div>
      </CcInfo>
      <Trade state={state}>
        <div className="rs-home-block">
          <Title type="block" refresh={setBlockList} />
          <div className="rs-home-block-list">
            {blockList.map((item, i) => (
              <div key={i} className="rs-home-block-li">
                <div className="rs-home-block-li-block">
                  <Link href={`/block/${item.number}`} as={`/block/${item.number}`}>
                    <a>Block {item.number}</a>
                  </Link>
                  <div>
                    {getDuration(item.timestamp, intl.locale).toString()} {intl.messages.lang14}
                  </div>
                </div>
                <div className="rs-home-block-li-ri">
                  <div className="block">
                    <span>{intl.messages.lang15}</span>
                    <Link href={`/addr/${item.miner}`} as={`/addr/${item.miner}`}>
                      <a>{item.miner}</a>
                    </Link>
                  </div>
                  <div className="txns">{item.txn} txns</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rs-home-ts">
          <Title type="trade" refresh={setTradeList} />
          <div className="rs-home-ts-list">
            {tradeList.map((item, i) => (
              <div key={i} className="rs-home-ts-li">
                <RadarChartOutlined />
                <div className="rs-home-ts-cont">
                  <div className="addr">
                    <span>TX</span>
                    <Link href={`/hash/${item.hash}`} as={`/hash/${item.hash}`}>
                      <a>{item.hash}</a>
                    </Link>
                  </div>
                  <div className="path">
                    <span>{intl.messages.lang16}</span>
                    <Link href={`/addr/${item.from}`} as={`/addr/${item.from}`}>
                      <a>{item.from}</a>
                    </Link>
                    <span className="an">{intl.messages.lang17}</span>
                    {item.value === '0' ? (
                      <Link href={`/addr/0x${item.input?.substring(34, 74)}`} as={`/addr/0x${item.input?.substring(34, 74)}`}>
                        <a>0x{item.input?.substring(34, 74)}</a>
                      </Link>
                    ) : (
                      <Link href={`/addr/${item.to}`} as={`/addr/${item.to}`}>
                        <a>{item.to}</a>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="time">
                  {getDuration(item.timestamp, intl.locale).toString()}
                  {intl.messages.lang14}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Trade>
    </Layout>
  )
})

const CcInfo = Styled.div`
  height:${(props) => (props.state.window > 1199 ? '240px' : 'auto')};
  display:${(props) => (props.state.window > 1199 ? 'flex' : 'block')};
  > div{
    padding: 20px;
    width: ${(props) => (props.state.window > 1199 ? '49.5%' : '100')};
    height: 100%;
    background:#fff;
    border-radius:6px;
    &:first-child{
      margin-right:${(props) => (props.state.window > 1199 ? '1%' : '0')};
      margin-bottom:${(props) => (props.state.window > 1199 ? '0' : '20px')};
    }
    .title{
      font-size: 18px;
      margin-bottom: 10px;
      color: #666;
    }
    .rs-home-price{
      display: flex;
      align-items: center;
      color: #323232;
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 20px;
      span{
        margin-left:15px;
        color: #38c9af;
        font-size: 16px;
        &.font-red{
          color: #e66157;
        }
      }
    }
    .rs-home-info-list{
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      span{
        color: #999;
        line-height: 18px;
        height: 18px;
        font-size: 14px;
      }
      em{
        flex:1;
        color: #6E7594;
        text-align: right;
        font-weight: bold;
      }
    }
  }

`
const Trade = Styled.div`
  margin-top:20px;
  border-radius: 6px;
  display: ${(props) => (props.state.window > 1199 ? 'flex' : 'block')};
  background: #fff;
  > div{
    padding: 0 10px 15px;
    width:${(props) => (props.state.window > 1199 ? '50%' : '100%')};
    &:first-child{
      border-right:1px solid #eee;
    }
    .rs-home-block-list{
      padding: 0 10px 20px;
      overflow-y: auto;
      height: 620px;
      .rs-home-block-li{
        height: 60px;
        margin-bottom: 20px;
        display: flex;
        .rs-home-block-li-block{
          text-align: center;
          background: #40a9ff;
          padding: 10px;
          color:#fff;
          margin-right: 10px;
          width: 120px;
          border-radius: 4px;
          font-size: 14px;
          color:#fff;
          a{
            text-decoration: underline;
            height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100px;
            display: block;
            color:#fff;
          }
        }
        .rs-home-block-li-ri{
          flex: 1;
          align-items: center;
          width: 100%;
          overflow: hidden;
          .block{
            height: 20px;
            line-height: 20px;
            color: #40a9ff;
            margin-top:10px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              color: #333;
            }
          }
          .txns{
            color:#40a9ff;
          }
        }
      }
    }
    .rs-home-ts-list{
      padding: 0 10px 20px;
      overflow-y: auto;
      height: 620px;
      .rs-home-ts-li{
        display: flex;
        align-items: center;
        height: 60px;
        margin-bottom: 20px;
        > span{
          margin-right: 15px;
          font-size: 24px;
        }
        .rs-home-ts-cont{
          flex:1;
          overflow: hidden;
          .addr{
            color:#40a9ff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              color:#333;
              margin-right: 5px;
              font-weight: 600;
            }
          }
          .path{
            display: flex;
            span{
              color:#999;
              margin-right: 5px;
              &.an{
                margin-left:5px
              }
            }
            a{
              color:#40a9ff;
              max-width: 172px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
            }
          }
        }
        .time{
          width: 120px;
          text-align: right;
          margin-left: 10px;
          color:#999;
        }
      }
    }
  }
`

const CTitle = Styled.div`
.title {
  font-size: 16px;
  margin-bottom: 15px;
  color: #999;
  border-bottom: 1px solid #eee;
  display: flex;
  height: 45px;
  align-items: center;
  > span{
    font-weight: 600;
    color: #666;
    em{
      margin-left: 10px;
    }
  }
  .rs-home-block-top {
    text-align: right;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

`

const handleGetBlock = async (isServer, ctx) => {
  if (isServer) {
    return await fetch(`/api/home/block`, ctx)
  } else {
    return await http.get('/api/home/block')
  }
}
const handleGetTrade = async (isServer, ctx) => {
  if (isServer) {
    return await fetch(`/api/home/trade`, ctx)
  } else {
    return await http.get('/api/home/trade')
  }
}

export const getServerSideProps = async (ctx) => {
  const list = await Promise.all([fetch(`/api/home/block`, ctx), fetch(`/api/home/trade`, ctx), await fetch(`/api/home/info`, ctx)])
  return {
    props: {
      block: list[0],
      trade: list[1],
      info: list[2]
    }
  }
}
export default Index

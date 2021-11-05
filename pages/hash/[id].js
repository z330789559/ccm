import { useState, useEffect, useContext } from 'react'
import http from '../../utils/http'
import { withRouter } from 'next/router'
import { getDuration } from '../../utils/date'
import { analysisInput, formatDate } from '../../utils/common'
import Link from 'next/link'
import Styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { MyContext } from '../../reducer'
import Layout from '../../components/layout'
import { PayCircleOutlined, RocketOutlined } from '@ant-design/icons'

const Hash = injectIntl(({ router, intl }) => {
  const { state } = useContext(MyContext)
  const id = router.query.id
  const [trade, setTrade] = useState({})
  useEffect(() => {
    http.get(`/api/trade/hash/${id}`, (data) => {
      setTrade(data)
    })
  }, [])

  const handleTradeSuccess = () => {
    if (trade.newBlockNumber - trade.blockNumber >= 6) {
      return <div className="success type">{intl.messages.lang45}</div>
    } else if (trade.input) {
      return <div className="an type">{intl.messages.lang65}</div>
    }
  }

  const handleTokenTradeSuccess = () => {
    if (!trade.isSuccess) {
      return <div className="error type">{trade.blockNumber ? intl.messages.lang46 : ''}</div>
    } else if (trade.isSuccess && trade.newBlockNumber - trade.blockNumber >= 6) {
      return <div className="success type">{intl.messages.lang45}</div>
    } else {
      return <div className="an type">{intl.messages.lang65}</div>
    }
  }

  return (
    <Layout>
      <Box state={state}>
        <div className="rs-hash-head">
          <em>{intl.messages.lang43}</em>
          {id}
        </div>
        <div className="rs-hash-btn-cont">
          <div className="rs-hash-btn">
            <PayCircleOutlined />
            <div className="rs-hash-btn-ri">
              <span className="title">{intl.messages.lang44}</span>
              {trade.statusV === '0x38' ? handleTokenTradeSuccess() : handleTradeSuccess()}
            </div>
          </div>
          <div className="rs-hash-btn">
            <RocketOutlined />
            <div className="rs-hash-btn-ri">
              <span className="title">{intl.messages.lang28}</span>
              <div className="type an">{trade.blockNumber}</div>
            </div>
          </div>
        </div>
        <div className="rs-hash-list">
          <div className="rs-hash-li">
            <em>{intl.messages.lang48}:</em>
            <div className="cont">{trade.timestamp ? formatDate(trade.timestamp * 1000) : ''}</div>
          </div>
          <div className="rs-hash-li">
            <em>{intl.messages.lang24}:</em>
            <div className="cont">
              <Link href={`/addr/${trade.from}`} as={`/addr/${trade.from}`}>
                <a>{trade.from}</a>
              </Link>
            </div>
          </div>
          {trade.statusV === '0x37' && (
            <div className="rs-hash-li">
              <em>{intl.messages.lang25}:</em>
              <div className="cont">
                <Link href={`/addr/${trade.to}`} href={`/addr/${trade.to}`}>
                  <a>{trade.to}</a>
                </Link>
              </div>
            </div>
          )}
          {trade.statusV === '0x38' && (
            <div className="rs-hash-li">
              <em>{intl.messages.lang49}:</em>

              <div className="cont">
                <Link href={`/receiver/${trade.to}`} href={`/receiver/${trade.to}`}>
                  <a>{trade.to}</a>
                </Link>
              </div>
            </div>
          )}
          <div className="rs-hash-li">
            <em>{intl.messages.lang26}:</em>
            <div className="cont">{trade.value} CCM</div>
          </div>
        </div>
        {trade.statusV === '0x38' && (
          <div className="rs-hash-list">
            <div className="rs-hash-title">{intl.messages.lang57}</div>
            <div className="rs-hash-li">
              <em>{intl.messages.lang25}:</em>
              <div className="cont">
                <Link href={`/addr/${trade.realAddress}`} as={`/addr/${trade.realAddress}`}>
                  <a>{trade.realAddress}</a>
                </Link>
              </div>
            </div>
            <div className="rs-hash-li">
              <em>{intl.messages.lang26}:</em>
              <div className="cont">
                {analysisInput(trade.input, trade.decimals)} {trade.symbol}
              </div>
            </div>
          </div>
        )}
      </Box>
    </Layout>
  )
})

const Box = Styled.div`

.rs-hash-head{
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
.rs-hash-btn-cont{
  margin-top:20px;
  display: flex;
  .rs-hash-btn{
    width:48%;
    border-radius:4px;
    display:flex;
    height: 50px;
    background: #fff;
    justify-content: center;
    height:80px;
    &:first-child{
      margin-right:4%
    }
    .anticon {
      line-height:80px;
      margin-right:20px;
      font-size:25px;
      color:#1c8aec;
    }
    .rs-hash-btn-ri{
      padding-top: 13px;
      min-width: 80px;
      text-align: center;
      .title{
        margin-top:20px;
      }
      .type{
        margin-top:3px;
        font-weight:bold;
        &.an{
          color:#1c8aec;
        }
        &.success{
          color: rgb(0, 194, 0);
        }
        &.error{
          color:#ff0000;
        }
      }
    }
  }
}
.rs-hash-list{
  background: #fff;
  border-radius: 2px;
  margin-top:20px;
  box-shadow: 0 0 8px 0 hsla(0,0%,40%,.11);
  .rs-hash-title{
    padding: 0 10px;
    line-height: 40px;
    font-weight: 700;
  }
  .rs-hash-li{
    display: flex;
    padding: 0 14px;
    height: 50px;
    align-items: center;
    &:nth-child(even){
      background: rgb(248,248,248);
    }
    > em{
      width:${(props) => (props.state.window > 1199 ? '160px' : 'auto')};
      padding-right:${(props) => (props.state.window > 1199 ? '0' : '10px')};
      font-family:"Arial";
    }
    .cont{
      flex:1;
      color: #333;
      font-weight: 100;
      font-family: Arial;
      font-style: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      a{
        color:#1890ff;
      }
    }
  }
  
}
`
export default withRouter(Hash)

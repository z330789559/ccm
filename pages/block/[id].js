import { useState, useEffect, useContext } from 'react'
import Styled from 'styled-components'
import Layout from '../../components/layout'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import { injectIntl } from 'react-intl'
import { getDuration } from '../../utils/date'
import http from '../../utils/http'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { MyContext } from '../../reducer'
import { formatDate } from '../../utils/common'

const BlockInfo = injectIntl(({ router, intl }) => {
  const { state } = useContext(MyContext)
  const [block, setBlock] = useState({})
  const id = router.query.id

  const handleNext = (next) => {
    const number = parseInt(id)
    if (next === 'up') {
      Router.push(`/block/${number + 1}`)
    } else {
      Router.push(`/block/${number - 1}`)
    }
  }

  useEffect(() => {
    http.get(`/api/block/${id}`, (data) => {
      setBlock(data)
    })
  }, [])

  return (
    <Layout>
      <Box state={state}>
        <div className="rs-blockInfo-title">
          {intl.messages.lang28} #<span>{id}</span>
        </div>
        <div className="rs-blockInfo-list">
          <div className="rs-blockInfo-top">{intl.messages.lang29}</div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang30}:</span>
            <div className="rs-blockInfo-li-ri an">
              <a onClick={() => handleNext('down')}>
                <DoubleLeftOutlined />
              </a>
              {id}
              <a onClick={() => handleNext('up')}>
                <DoubleRightOutlined />
              </a>
            </div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang43}:</span>
            <div className="rs-blockInfo-li-ri">{block.hash}</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang31}:</span>
            <div className="rs-blockInfo-li-ri">{block.timestamp ? formatDate(block.timestamp * 1000) : ''}</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang32}:</span>
            <div className="rs-blockInfo-li-ri">{block.ts}</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang15}:</span>
            <div className="rs-blockInfo-li-ri">{block.miner}</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang22}:</span>
            <div className="rs-blockInfo-li-ri">{block.size} bytes</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang33}:</span>
            <div className="rs-blockInfo-li-ri">{block.totalDifficulty}</div>
          </div>
          <div className="rs-blockInfo-li">
            <span>{intl.messages.lang34}:</span>
            <div className="rs-blockInfo-li-ri">{block.parentHash}</div>
          </div>
        </div>
      </Box>
    </Layout>
  )
})

const Box = Styled.div`
.rs-blockInfo-title{
  padding: 16px 14px;
  background: #fff;
  box-shadow: 0 2px 4px 0 #E4E4E4;
  border-radius: 4px;
  margin-bottom: 22px;
  overflow: hidden;
  color: #999;
  font-size: 16px;
  span{
    margin-left:5px;
    color:#40a9ff;
  }
}
.rs-blockInfo-list{
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 #E4E4E4;
  .rs-blockInfo-top{
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    background: rgb(239,246,245);
    padding: 0 14px;
  }
  .rs-blockInfo-li{
    display: flex;;
    padding: 0 14px;
    height: 50px;
    align-items: center;
    &:nth-child(odd){
      background: rgb(248,248,248);
    }
    > span{
      width:${(props) => (props.state.window > 1199 ? '160px' : 'auto')};
      padding-right:${(props) => (props.state.window > 1199 ? '0' : '10px')};
      font-family:"Arial";
    }
    .rs-blockInfo-li-ri{
      color: #333;
      font-weight: 100;
      font-family: Arial;
      font-style: normal;
      display: ${(props) => (props.state.window > 1199 ? 'flex' : 'block')};;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1;
      &.an{
        display: flex !important;
        align-items: center;
      }
      a{
        padding: 4px 10px;
        background: #40a9ff;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin-right: 10px;
        &:last-child{
          margin-left:10px;
        }
      }
    }
  }
}

`

export default withRouter(BlockInfo)

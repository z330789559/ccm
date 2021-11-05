import Styled from 'styled-components'
import { useState, useContext } from 'react'
import { Input, Select } from 'antd'
import { injectIntl } from 'react-intl'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons'
import { MyContext } from '../reducer'

const { Search } = Input

const isAddress = (address) => {
  if (/^(0x)?[0-9a-fA-F]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return true
  } else {
    // Otherwise check each case
    return false
  }
}

const isTransaction = (tx) => {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(tx)) {
    // check if it has the basic requirements of an address
    return false
  } else if (/^(0x)?[0-9a-f]{64}$/.test(tx) || /^(0x)?[0-9A-F]{64}$/.test(tx)) {
    // If it's all small caps or all all caps, return true
    return true
  } else {
    // Otherwise check each case
    return false
  }
}

const handleOnSearch = (value) => {
  const search = value.toLowerCase().trim()
  if (!search) {
    return false
  }
  if (isAddress(search)) Router.push(`/addr/${search}`)
  else if (isTransaction(search)) Router.push(`/hash/${search}`)
  else Router.push(`/block/${search}`)
}

const H5header = ({ intl, state }) => {
  const [visible, setVisible] = useState(false)
  const changeLanguage = (value) => {
    value !== intl.locale && window.handleChangeLang(value)
  }
  return (
    <Hheader>
      <Htop>
        <Link href="/">
          <a>
            <img className="rs-header-logo" src="/images/logo.png" />
          </a>
        </Link>
        <span className="title">CCM {intl.messages.lang62}</span>
        <div className="rs-h5-header-ri">
          <Select
            defaultValue={intl.locale}
            onChange={(value) => {
              changeLanguage(value)
            }}
          >
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
          <UnorderedListOutlined onClick={() => setVisible(true)} className="rs-h5-tap" />
        </div>
      </Htop>
      <div className="rs-h5-search">
        <Search placeholder={intl.messages.lang4} allowClear enterButton={intl.messages.lang5} size="large" onSearch={(value) => handleOnSearch(value)} />
      </div>
      <div className={visible ? 'rs-drawer-header an' : 'rs-drawer-header'}>
        <div className={visible ? 'rs-drawer-header-cont an' : 'rs-drawer-header-cont'}>
          <div className="rs-darwer-header-title">
            <div className="title">{intl.messages.lang64}</div>
            <div className="rs-darwer-header-close" onClick={() => setVisible(false)}>
              <CloseOutlined />
            </div>
          </div>
          <div className="rs-darwer-header-list">
            <div className="rs-drawer-header-li">
              <Link href="/">
                <a>{intl.messages.lang1}</a>
              </Link>
            </div>
            <div className="rs-drawer-header-li">
              <Link href="/block">
                <a>{intl.messages.lang2}</a>
              </Link>
            </div>
            <div className="rs-drawer-header-li">
              <Link href="/trade">
                <a>{intl.messages.lang3}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Drawer title="Create a new account" width={state.window > 1199 ? '1200px' : '80%'} onClose={() => setVisible(false)} visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <HeaderList>
          <div className="rs-h5-header-li">
            <Link href="/">
              <a>{intl.messages.lang1}</a>
            </Link>
          </div>
          <div className="rs-h5-header-li">
            <Link href="/block">
              <a>{intl.messages.lang2}</a>
            </Link>
          </div>
          <div className="rs-h5-header-li">
            <Link href="/trade">
              <a>{intl.messages.lang3}</a>
            </Link>
          </div>
        </HeaderList>
      </Drawer> */}
    </Hheader>
  )
}

const Header = injectIntl(({ intl, router }) => {
  const { state } = useContext(MyContext)
  const changeLanguage = (value) => {
    value !== intl.locale && window.handleChangeLang(value)
  }

  return (
    <Box state={state}>
      {state.window > 1199 && (
        <div className="rs-header-cont">
          <Link href="/">
            <a>
              <img className="rs-header-logo" src="/images/logo.png" />
            </a>
          </Link>
          <div className="rs-header-ri">
            <span className={router.pathname === '/' || router.pathname === '/index' ? 'active' : ''}>
              <Link href="/">
                <a>{intl.messages.lang1}</a>
              </Link>
            </span>
            <span className={router.pathname === '/block' ? 'active' : ''}>
              <Link href="/block">
                <a>{intl.messages.lang2}</a>
              </Link>
            </span>
            <span className={router.pathname === '/trade' ? 'active' : ''}>
              <Link href="/trade">
                <a>{intl.messages.lang3}</a>
              </Link>
            </span>
            <div className="rs-lang-list">
              <div className="rs-lang-name">{intl.locale === 'en' ? 'English' : '中文'}</div>
              <ul>
                <li className="lang === 'zh'? 'active':''" onClick={() => changeLanguage('zh')}>
                  中文
                </li>
                <li className="lang === 'en' ? 'active':''" onClick={() => changeLanguage('en')}>
                  English
                </li>
              </ul>
            </div>
          </div>
          <div className="rs-header-search">
            <Search placeholder={intl.messages.lang4} allowClear enterButton={intl.messages.lang5} size="large" onSearch={(value) => handleOnSearch(value)} />
          </div>
        </div>
      )}
      {state.window < 1199 && <H5header state={state} intl={intl} />}
    </Box>
  )
})

const Hheader = Styled.div`
background:#fff;
padding-bottom:10px;
.rs-h5-search{
  padding: 0 20px;
}
.rs-drawer-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  justify-content: flex-end;
  display:none;
  &.an{
    display: flex;
  }
  .rs-drawer-header-cont{
    width: 0;
    padding: 0;
    background: #fff;
    padding: 15px;
    &.an{
      width: 70%;
    height: 100%;
    }
    .rs-darwer-header-title{
      height:40px;
      line-height:40px;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      .title{
        flex: 1;
      }
      .rs-darwer-header-close{
        border: 1px solid #999;
        color: #999;
        border-radius: 50%;
        height: 20px;
        display: flex;
        align-items: center;
        width: 20px;
        font-size: 12px;
        justify-content: center;
        float: revert;
      }
    }
    .rs-darwer-header-list{
      .rs-drawer-header-li{
        font-size: 16px;
        line-height: 35px;
      }
    }
  }
}
`
const HeaderList = Styled.div`
  .rs-h5-header-li{
    height:40px;
    line-height:40px;
    font-size:20px;
  }
`

const Htop = Styled.div`
  display:flex;
  align-items:center;
  height: 80px;
  padding:20px;
  img{
    width:40px;
    height:40px;
  }
  .title{
    margin-left:10px;
    flex: 1;
    overflow: hidden;
    height: 22px;
  }
  .rs-h5-header-ri{
    flex:1;
    text-align: right;
    .rs-h5-tap{
      font-size:20px;
      margin-left:20px;
    }
  }
`
const Box = Styled.div`
  width: 100%;
  height: 80px;
  background: #fff;
  box-shadow: -3px 5px 7px #eee;
  position: fixed;
  top: 0;
  z-index:99;
  .rs-header-cont{
    height:80px;
    width: ${(props) => (props.state.window > 1199 ? '1200px' : '92vw')};
    margin: 0 auto;
    display: flex;
    align-items: center; 
  }

  .rs-header-logo {
    width: 40px; 
    height: 40px;
  }
  .rs-header-ri{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    > span{
      line-height: 80px;
      color: #6c757e;
      font-size: 16px;
      width: 140px;
      text-align: center;
      &.active a{
        color: #1c8aec;
        font-weight: bold;
      }
      a{
        cursor: pointer;
      width: 100%; 
      height: 80px;
      display: block;
      color: #6c757e;
      position: relative;
      text-decoration: none;
      }
    }
  }
  .rs-lang-list{
    height: 80px;
    position: relative;
    &:hover ul{
      display: block;
    }
    ul{
      display: none;
      position: absolute;
      position: absolute;
      list-style: none;
      top: 100%;
      margin: 0;
      padding: 0;
      border: 1px solid #eee;
      border-radius: 4px !important;
      z-index: 99;
      background: #fff;
      li{
        text-align: center;
        width: 120px;
        height: 30px;
        line-height: 30px;
        color: #6c757e;
        cursor: pointer;
        &:first-child {
          border-bottom: 1px solid #eee;
        }
        &.active{
          color: #1c8aec;
        }
        &:hover{
          background-color: #1c8aec;
          color: #fff;
        }
      }
    }
    .rs-lang-name{
      color: #6c757e;
      font-size: 16px;
      width: 120px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
    }
  }
  .rs-header-search{
    width:350px;
  }
`

export default withRouter(Header)

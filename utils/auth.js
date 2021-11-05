import { useEffect, useState } from 'react'
import { getCookies, setCookie } from './cookie'
import zh_CN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { ConfigProvider } from 'antd'
import enLang from 'react-intl/locale-data/en'
import zhLang from 'react-intl/locale-data/zh'
import { IntlProvider, addLocaleData } from 'react-intl'
import zh from '../utils/lang/zh'
import en from '../utils/lang/en'
import ContextProvider from '../reducer'
import { isMobile, parseQueryString } from './common'
import Router from 'next/router'
addLocaleData([...enLang, ...zhLang])

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const handleGetLang = () => {
      if (props.language === 'en') {
        return 'en'
      } else {
        return 'zh'
      }
    }
    const [lang, setLang] = useState(handleGetLang())
    const handleLang = (la, isAnt) => {
      switch (la) {
        case 'en':
          if (isAnt) {
            return enUS
          } else {
            return en
          }
        default:
          if (isAnt) {
            return zh_CN
          } else {
            return zh
          }
      }
    }

    useEffect(() => {
      // 兼容之前的hash 地址
      handlePath()

      if (props.lang) {
        setCookie('lang', props.lang, 365)
      }

      window.handleChangeLang = (type) => {
        setCookie('lang', type, 365)
        setLang(type)
      }

      var lastTouchEnd = 0
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener(
        'touchend',
        (event) => {
          var now = new Date().getTime()
          if (now - lastTouchEnd <= 300) {
            event.preventDefault()
          }
          lastTouchEnd = now
        },
        false
      )
      // 阻止双指放大
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
      })
      // dispatch({ type: 'SET_WINDOW', data: window.innerWidth })
      return () => {
        window.handleChangeLang = null
      }
    }, [])

    const handlePath = () => {
      const { href, hash } = window.location
      if (hash.startsWith('#/hashsearch?id=')) {
        const id = parseQueryString(href).id
        location.href = `/hash/${id}`
      } else if (hash.startsWith('#/addresssearch?id=')) {
        const id = parseQueryString(href).id
        location.href = `/addr/${id}`
      }
    }

    return (
      <ConfigProvider locale={handleLang(lang, true)}>
        <IntlProvider locale={lang} messages={handleLang(lang, false)}>
          <ContextProvider mobile={props.mobile}>
            <WrappedComponent {...props} language={props.language} />
          </ContextProvider>
        </IntlProvider>
      </ConfigProvider>
    )
  }

  Wrapper.getInitialProps = async (ctx) => {
    if (!ctx.router.asPath?.startsWith('/_next/static') && ctx.ctx.res?.statusCode === 404) {
      ctx.ctx.res.writeHead(302, { Location: '/' })
      ctx.ctx.res.end()
    }
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
    let language
    let lang = ''
    const mobile = typeof window === 'undefined' ? isMobile(ctx.ctx.req.headers['user-agent']) : isMobile(window.navigator.userAgent)
    if (ctx.ctx.query.lang) {
      language = ctx.ctx.query.lang === 'en' ? 'en' : 'zh'
      lang = language
    } else {
      language = getCookies(ctx.ctx.req)['lang'] || 'zh'
    }
    ctx.ctx.language = language
    return { ...componentProps, language, lang, mobile }
  }

  return Wrapper
}

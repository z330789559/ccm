import Styled from 'styled-components'
import { MyContext } from '../reducer'
import { useContext } from 'react'

const Footer = () => {
  const { state } = useContext(MyContext)
  return (
    <FooterDiv state={state}>
      <div className="rs-footer-cont">
        <img src="/images/Ellipse662.png" />
        <img className="logo" src="/images/logo.png" />
        <div className="rs-footer-copyright">copyright©2019 hml.com ALL Rights Rwsened</div>
      </div>
    </FooterDiv>
  )
}

const FooterDiv = Styled.div`
  background:#2070d4;
  text-align: center;
  padding-top: 20px;
  .rs-footer-cont{
    margin:0 auto;
    position: relative;
    width: ${(props) => (props.state.window > 1199 ? '1200px' : '100%')};
    img{
      margin: 10px 0;
      max-width:100%;
    }
    .logo{
      width: 60px;
      height: 60px;
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
    }
    .rs-footer-copyright{
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      border-top: 1px solid rgb(75, 118, 202);
    }
  }
`

export default Footer

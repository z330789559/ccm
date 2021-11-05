import { useContext } from 'react'
import GridH5 from './Grid-h5'
import GridWeb from './Grid-web'
import { MyContext } from '../../reducer'

const Grid = (props) => {
  const { state } = useContext(MyContext)
  return state.window > 1199 ? <GridWeb {...props} isShow={state.window > 1199} /> : <GridH5 {...props} isShow={state.window <= 1199} />
}

export default Grid

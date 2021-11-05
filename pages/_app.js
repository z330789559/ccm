import App from 'next/app'
import { withAuthSync } from '../utils/auth'
import '../components/main.less'

class MyApp extends App {}
export default withAuthSync(MyApp)

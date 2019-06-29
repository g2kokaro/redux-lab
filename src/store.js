import { createStore } from 'redux'
import TxListReducer from './TxListReducer.js'

const store = createStore(TxListReducer)
export default store
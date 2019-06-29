const initialState = { address: '0xa4b9663aa59642a9c3a8bca87542abbf9462b213',
                       transactions: [] }
function TxListReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TRANSACTIONS": {
      return { ...state, ...action }
    }
    default:
      return state
  }
}

export default TxListReducer

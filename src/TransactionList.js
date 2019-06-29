import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from './action.js'
const ethers = require('ethers')

const monospace = {
  fontFamily: 'monospace',
}


// Table and TableRow from https://codepen.io/focuswish/pen/qqGXMZ
class TableRow extends React.Component {
  render() {
    const {
      data
    } = this.props;
    const row = data.map((data) =>
      <tr key={data.hash} style={monospace}>
        <td key={data.from}>{data.from}</td>
        <td key={data.to}>{data.to}</td>
        <td key={data.value._hex}>{ethers.utils.formatEther(data.value._hex)}</td>
      </tr>
    );
    return row

  }
}

class Table extends React.Component {
  render() {
    if (this.props.data.length > 0) {
      return (
        <table>
          <tbody>
            <tr><td>From</td><td>To</td><td>Amount (ETH)</td></tr>
            <TableRow data={this.props.data} />
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }
}

class TransactionList extends Component {
  handleGetTx = () => {
    let etherscanProvider = new ethers.providers.EtherscanProvider();

    etherscanProvider.getHistory(this.props.address).then((history) => {
      this.props.onGetTx(history);
    });
  }

  render() {
    const { address, transactions } = this.props
    // let listItems
    // if (transactions) {
    //   listItems = transactions.map((tx) =>
    //     <li>{tx.timestamp}</li>
    //   );
    // }
    return (
      <div>
        <form>
          <label>
            Address:
            <input type="text" value={address} readOnly />
          </label>
          <button type="button" onClick={this.handleGetTx}>Get transactions</button>

        </form>
        <Table data={transactions} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.address,
    transactions: state.transactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTx: (transactions) => {
      dispatch(getTransactions(transactions))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)


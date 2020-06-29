import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.map((stock) => (
          <Stock handleStock={this.props.addStock} key={stock.id} stock={stock}></Stock>
        ))}
      </div>
    );
  }

}

export default StockContainer;

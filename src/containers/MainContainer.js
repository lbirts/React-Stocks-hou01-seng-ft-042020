import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stockCollection: [],
    myStocks: [],
    filter: "All",
    sort: "None"
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(res => res.json())
      .then(stocks => {
        this.setState({
          stockCollection: stocks
        })
      })
  }

  addStock = (stock) => {
    if (!this.state.myStocks.includes(stock)) {
      this.setState({
        myStocks: [...this.state.myStocks, stock]
      })
    }
  }

  removeStock = (stock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(s => s.id !== stock.id)
    })
  }

  handleSort = (e) => {
    if (e.target.value === "Alphabetically") {
      this.setState({
        sort: e.target.value, 
        
      })
    } else if (e.target.value === "Price") {
      this.setState({
        sort: e.target.value, 
      })
    }
  }

  handleFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  updatedStockList = () => {
    let filtered = [...this.state.stockCollection]
    if (this.state.filter !=="All") {
      filtered = filtered.filter(stock => stock.type === this.state.filter)
    }

    switch (this.state.sort) {
      case "Alphabetically":
        return filtered = filtered.sort((a, b) => {if(a.name < b.name) {return -1} else if (a.name > b.name) {return 1} else {return 0}})
      case "Price":
        return filtered = filtered.sort((a, b) => {return a.price - b.price})
      default:
        return filtered
    }
  }

  render() {
    let filtered = this.updatedStockList()
    return (
      <div>
        <SearchBar filter={this.state.filter} sort={this.state.sort} handleSort={this.handleSort} handleFilter={this.handleFilter} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={filtered} addStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStock={this.state.myStocks} removeStock={this.removeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

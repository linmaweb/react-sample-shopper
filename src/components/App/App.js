import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import ItemPage from "../ItemPage/ItemPage";
import CartPage from "../CartPage/CartPage";
import { items } from "../../config";
import "./App.css";

class App extends React.Component {
  state = {
    cart: [],
  };

  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id],
    });
  };

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1),
      ],
    });
  };

  computeCartItems() {
    const itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});

    return Object.keys(itemCounts).map((itemId) => {
      const item = items.find((item) => item.id === parseInt(itemId, 10));
      return {
        ...item,
        count: itemCounts[itemId],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav items={this.computeCartItems()} />
            <Switch>
              <Route exact path="/">
                <ItemPage items={items} onAddToCart={this.handleAddToCart} />
              </Route>
              <Route path="/cart">
                <CartPage
                  items={this.computeCartItems()}
                  onAddOne={this.handleAddToCart}
                  onRemoveOne={this.handleRemoveOne}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

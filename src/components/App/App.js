import React from "react";
import Nav from "../Nav/Nav";
import ItemPage from "../ItemPage/ItemPage";
import CartPage from "../CartPage/CartPage";
import { items } from "../../config";
import "./App.css";

class App extends React.Component {
  state = {
    activeTab: 0,
    cart: [],
  };

  handleTabChange = (index) => {
    this.setState({
      activeTab: index,
    });
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

  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0:
        return <ItemPage items={items} onAddToCart={this.handleAddToCart} />;
      case 1:
        return this.renderCart();
    }
  }

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

  renderCart() {
    return (
      <CartPage
        items={this.computeCartItems()}
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne}
      />
    );
  }

  render() {
    let { activeTab } = this.state;
    return (
      <div className="App">
        <Nav
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          items={this.computeCartItems()}
        />
        <main className="App-content">{this.renderContent()}</main>
      </div>
    );
  }
}

export default App;

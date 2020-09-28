import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import Title from "../Title/Title";
import ItemPage from "../ItemPage/ItemPage";
import CartPage from "../CartPage/CartPage";
import { items } from "../../config";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item.id]);
  };

  const handleRemoveOne = (item) => {
    let index = cart.indexOf(item.id);
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  };

  const computeCartItems = () => {
    const itemCounts = cart.reduce((itemCounts, itemId) => {
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
  };

  return (
    <>
      <Title type="Shopper" />
      <div className="App">
        <Router>
          <div>
            <Nav items={computeCartItems()} />
            <Switch>
              <Route exact path="/">
                <ItemPage items={items} onAddToCart={handleAddToCart} />
              </Route>
              <Route path="/cart">
                <CartPage
                  items={computeCartItems()}
                  onAddOne={handleAddToCart}
                  onRemoveOne={handleRemoveOne}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;

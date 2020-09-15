import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = ({ items }) => {
  const itemCount = items.reduce((sum, item) => {
    return sum + item.count;
  }, 0);
  const itemTotal = items.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  return (
    <nav className="App-nav">
      <ul>
        <li className="App-nav-item">
          <NavLink
            to="/"
            exact
            activeStyle={{
              borderBottom: "3px solid #e88073",
            }}
          >
            Items
          </NavLink>
        </li>
        <li className="App-nav-item">
          <NavLink
            to="/cart"
            activeStyle={{
              borderBottom: "3px solid #e88073",
            }}
          >
            Cart
          </NavLink>
        </li>
      </ul>
      <div className="App-nav-item App-nav-cart-summary">
        <i className="fa fa-shopping-cart" />
        <span className="summary-item-count">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>{" "}
        {items.length > 0 && (
          <span className="summary-total">(${itemTotal.toFixed(2)})</span>
        )}
      </div>
    </nav>
  );
};
Nav.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Nav;

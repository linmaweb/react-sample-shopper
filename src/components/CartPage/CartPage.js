import React from "react";
import Item from "../Item/Item";
import "./CartPage.css";

const CartPage = ({ items, onAddOne, onRemoveOne }) => {
  return (
    <ul className="CartPage-items">
      {items.map((item) => (
        <li key={item.id} className="CartPage-item">
          <Item item={item}>
            <div className="CartItem-controls">
              <button
                className="CartItem-removeOne"
                onClick={() => onRemoveOne(item)}
              >
                &ndash;
              </button>
              <span className="CartItem-count">{item.count}</span>
              <button
                className="CartItem-addOne"
                onClick={() => onAddOne(item)}
              >
                +
              </button>
            </div>
          </Item>
        </li>
      ))}
    </ul>
  );
};

export default CartPage;

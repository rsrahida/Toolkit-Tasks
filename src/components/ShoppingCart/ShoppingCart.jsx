import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  updateQuantity,
} from "../../features/shoppingSlice";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { products, cart, totalAmount, status } = useSelector(
    (state) => state.shopping
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="shopping-container">
      <h1>Beauty Products</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load products.</p>}
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2>Shopping Cart</h2>
      <div className="cart">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h4>{item.title}</h4>
              <p>
                ${item.price} x {item.quantity}
              </p>
              <button onClick={() => dispatch(removeFromCart(item))}>
                Remove
              </button>
              <button onClick={() => dispatch(decreaseQuantity(item))}>
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: parseInt(e.target.value),
                    })
                  )
                }
              />
              <button onClick={() => dispatch(addToCart(item))}>+</button>
            </div>
          ))
        )}
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;

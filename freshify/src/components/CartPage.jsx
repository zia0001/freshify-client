import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Add your checkout logic here
    // For now, just navigate to home
    navigate('/home');
  };

  return (
    <div className="container py-5" style={{ marginTop: "70px" }}>
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <div className="mb-3" style={{ fontSize: "5rem" }}>🛒</div>
          <p className="fs-5">Your cart is empty</p>
          <Link to="/home" className="btn btn-success px-4 py-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-4 pb-4 border-bottom"
                  >
                    <div style={{ fontSize: "2rem", width: "60px" }}>
                      {item.icon}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1 text-success fw-bold">{item.price}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => removeFromCart(item.name)}
                        aria-label={`Remove one ${item.name} from cart`}
                      >
                        -
                      </button>
                      <span className="mx-2" style={{ minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => addToCart(item)}
                        aria-label={`Add one more ${item.name} to cart`}
                      >
                        +
                      </button>
                    </div>
                    <div className="ms-4 fw-bold" style={{ minWidth: "80px" }}>
                      ${(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "80px" }}>
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-4 pb-2 border-bottom">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-success w-100 mb-2 py-2"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-outline-danger w-100 py-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
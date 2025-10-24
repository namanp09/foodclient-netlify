import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ id, name, description, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

  return (
    <div className="col-auto mb-4 d-flex justify-content-center">
      <div className="food-item-card card shadow-sm border-0">
        <Link to={`/food/${id}`}>
          <img src={imageUrl} alt={name} className="card-img-top food-img" />
        </Link>

        <div className="card-body text-center">
          <h5 className="fw-semibold mb-1 text-truncate">{name}</h5>
          <p className="text-muted small mb-2 text-truncate">{description}</p>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold text-dark fs-5">₹{price}</span>
            <div className="rating d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted ms-1">(4.5)</small>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-center">
          {quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-danger btn-sm rounded-circle"
                onClick={() => decreaseQty(id)}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <span className="fw-bold fs-6">{quantities[id]}</span>
              <button
                className="btn btn-outline-success btn-sm rounded-circle"
                onClick={() => increaseQty(id)}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2"
              onClick={() => increaseQty(id)}
            >
              <i className="bi bi-cart-plus"></i> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;

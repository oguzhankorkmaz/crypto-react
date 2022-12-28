import React from "react";
import "./coinCard.scss";

function CoinCard({ img, name, longName, price }) {
  return (
    <div className="coin-card">
      <div className="coin-card-content">
        <div className="img-area">
          <img alt="coinImg" src={img} />
        </div>
        <div className="flex">
          <div className="coin-name">
            <div className="name">{name.toUpperCase()}</div>
            <div className="long-name">{longName}</div>
          </div>
          <div className="coin-price">
            <div className="price">{price} $</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;

import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import CoinCard from "./coinCard";
function Home() {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    fetchCrypto();
  }, [coin]);

  const fetchCrypto = async () => {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    const apiResponse = await data.json();
    setCoin(apiResponse);
  };

  //   useEffect(() => {
  //     fetch(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  //     ).then((res) => {
  //       setCoin(res.data);
  //       console.log(res);
  //     });
  //   });

  return (
    <>
      <h1>Al LAn</h1>
      <div className="coin-area">
        <div className="grid g-3">
          {coin.map((item, index) => (
            <CoinCard
              key={index}
              name={item.symbol}
              longName={item.name}
              img={item.image}
              price={item.current_price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

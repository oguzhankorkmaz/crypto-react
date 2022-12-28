import { useEffect, useRef, useState } from "react";

function CoinAPI() {
  const url = "https://rest.coinapi.io/v1";
  const apikey = "apikey=4A194815-5782-413D-8842-8A3A0E8EB82E";
  const apikeyMarketCap = "apikey=500f24d3-2634-479f-bbbb-c8a1505ca078";
  const [coin, setCoin] = useState([]);

  const [ws, setWs] = useState(
    new WebSocket("wss://ws-sandbox.coinapi.io/v1/")
  );

  const subscribe = {
    type: "hello",
    apikey: "4A194815-5782-413D-8842-8A3A0E8EB82E",
    heartbeat: false,
    subscribe_data_type: ["quote"],
    subscribe_filter_asset_id: ["BTC", "ETH"],
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("Websocket client connected");

      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (datas) => {
      // console.log(JSON.parse(datas.data));
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket("wss://ws-sandbox.coinapi.io/v1/"));
      };
    };
  }, [subscribe, ws]);

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-sandbox.coinapi.io/v1/");
    ws.onopen = (evt) => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    const apiCall = () => {
      fetch(url + "/exchanges?" + apikey)
        .then((res) => res.json())
        .then((data) => {
          for (var i = 0; i < 50; i++) {
            setCoin([data[i]]);
          }
          // console.log(data);
        });
    };

    apiCall();
  });
}

export default CoinAPI;

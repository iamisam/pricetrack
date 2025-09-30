import React, { useContext, useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import { useParams } from "react-router-dom";
import { coinContext } from "../context/CoinContext";

const Coin = () => {
  const gecko_key = import.meta.env.VITE_GECKO_API;
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(coinContext);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(365);

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": gecko_key,
        },
      };
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          options,
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  const fetchHistoricalData = async (selectedDays) => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": gecko_key,
      },
    };
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${selectedDays}`,
        options,
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.log("Some Error has occurred, " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData(days);
  }, [coinId, currency, days]);

  if (loading) {
    return (
      <div className="grid place-self-center min-h-screen">
        <div className="w-[65px] h-[65px] place-self-center border-5 border-[#bdbdbd] border-t-[#4500c6] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!coinData || !historicalData) {
    return <p>Please wait, fetching data for you.</p>;
  }

  return (
    <div className="p-2">
      <div className="flex flex-col items-center gap-5 my-10 mx-auto">
        <img src={coinData.image.large} alt="Coin Image" />
        <p className="text-amber-100 font-bold text-5xl">
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="m-auto h-[350px] max-w-[800px]">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="flex justify-center my-5">
        <select
          className="p-2 bg-[#5b0f4e] text-white border border-[#002834] rounded-lg focus:outline-none"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        >
          {[7, 10, 30, 90, 180, 365].map((day) => (
            <option key={day} value={day}>
              {day} Days
            </option>
          ))}
        </select>
      </div>
      <div className="text-gray-100 max-w-[600px] mx-auto my-20 flex flex-col">
        <ul className="flex flex-row justify-between px-10 py-0 my-3 border-b-2 border-b-[#5f5d5f] list-none">
          <li>Crypto Market Rank</li>
          <li className="font-bold">{coinData.market_cap_rank}</li>
        </ul>
        <ul className="flex flex-row justify-between px-10 py-0 my-3 border-b-2 border-b-[#5f5d5f] list-none">
          <li>Current Price</li>
          <li className="font-bold">
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul className="flex flex-row justify-between px-10 py-0 my-3 border-b-2 border-b-[#5f5d5f] list-none">
          <li>Market Cap</li>
          <li className="font-bold">
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul className="flex flex-row justify-between px-10 py-0 my-3 border-b-2 border-b-[#5f5d5f] list-none">
          <li>24 Hour High</li>
          <li className="font-bold">
            {currency.symbol}{" "}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul className="flex flex-row justify-between px-10 py-0 my-3 border-b-2 border-b-[#5f5d5f] list-none">
          <li>24 Hour Low</li>
          <li className="font-bold">
            {currency.symbol}{" "}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;

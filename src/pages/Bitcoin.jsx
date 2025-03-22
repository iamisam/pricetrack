import React, { useState, useEffect, useContext } from "react";
import { CSVLink } from "react-csv";
import { coinContext } from "../context/CoinContext"; // Import context
import BalanceTracker from "./BalanceTracker";

const Bitcoin = () => {
  const token = "8eb8d272ea8a458884f7fd20341ff763";
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastTransaction, setLastTransaction] = useState();

  const { currency } = useContext(coinContext);

  useEffect(() => {
    fetchBtcPrice();
  }, [currency]);

  const fetchBtcPrice = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-rMqEAsDi7qofiV5pf3RKJQxN",
      },
    };
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.name}`,
        options,
      );
      const data = await response.json();
      setBtcPrice(data.bitcoin[currency.name.toLowerCase()]);
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
    }
  };

  const fetchTransactions = async (startTx = "") => {
    setLoading(true);
    setError(null);

    const baseUrl = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full`;
    const url = startTx
      ? `${baseUrl}?before=${startTx}&token=${token}`
      : `${baseUrl}?token=${token}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.txs) {
        setTransactions((prev) => [...prev, ...data.txs]);
        setLastTransaction(data.txs[data.txs.length - 1].hash);
      }
    } catch (error) {
      setError("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalBitcoinSpent =
    transactions.reduce((sum, tx) => {
      return (
        sum + tx.outputs.reduce((txSum, output) => txSum + output.value, 0)
      );
    }, 0) / 1e8;

  const totalCurrencySpent = btcPrice ? totalBitcoinSpent * btcPrice : 0;

  const API_URL = "https://api.blockcypher.com/v1/btc/main/addrs/";
  const balanceForCSV = 0;
  async function fetchBalanceForCSV() {
    try {
      const response = await fetch(
        `${API_URL}${address}/balance?token=8eb8d272ea8a458884f7fd20341ff763`,
      );
      const data = await response.json();
      if (data.error) {
        balanceForCSV = data.error;
      } else {
        balanceForCSV = data.balance / 1e8;
      }
      return balanceForCSV;
    } catch (error) {
      console.log(error);
    }
  }

  const csvData = transactions.map((tx) => {
    const amountBTC =
      tx.outputs.reduce((sum, output) => sum + output.value, 0) / 1e8;
    const amountCurrency = btcPrice ? amountBTC * btcPrice : 0;
    return {
      Hash: tx.hash,
      Amount_BTC: amountBTC.toFixed(8),
      Amount_Currency: amountCurrency.toFixed(3),
      Currency: currency.name.toUpperCase(),
      Time: new Date(tx.received).toLocaleDateString("en-GB"),
      Confirmations: tx.confirmations,
    };
  });

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="p-4 m-10 flex flex-col">
        <h2 className="mb-10 text-gradient text-3xl font-bold text-white">
          View your Bitcoin Transactions
        </h2>
        <input
          type="text"
          placeholder="Enter Bitcoin Address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded-full px-6 my-5 bg-amber-50 py-5 text-black"
        />
        <button
          onClick={() => fetchTransactions()}
          className="w-60 items-center shadow-black shadow-xl cursor-pointer hover:bg-teal-600 bg-teal-300 text-black px-4 py-3 rounded-full "
        >
          Fetch Transactions
        </button>
        {loading && <p className="text-yellow-400 mt-10">Loading...</p>}
        {error && <p className="text-red-500 mt-10">{error}</p>}

        {transactions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-white mt-5 font-semibold text-2xl mb-2">
              Transactions:
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#5b0f4e] bg-[#002834] text-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-[#5b0f4e] text-white rounded-t-lg">
                  <tr>
                    <th className="px-4 py-2 border border-[#5b0f4e] first:rounded-tl-lg">
                      Transaction Hash
                    </th>
                    <th className="px-4 py-2 border border-[#5b0f4e]">
                      Amount (BTC)
                    </th>
                    <th className="px-4 py-2 border border-[#5b0f4e]">
                      Amount ({currency.name.toUpperCase()})
                    </th>
                    <th className="px-4 py-2 border border-[#5b0f4e]">Time</th>
                    <th className="px-4 py-2 border border-[#5b0f4e] last:rounded-tr-lg">
                      Confirmations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => {
                    const amountBTC =
                      tx.outputs.reduce(
                        (sum, output) => sum + output.value,
                        0,
                      ) / 1e8;

                    const amountCurrency = btcPrice ? amountBTC * btcPrice : 0;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-[#5b0f4e]/50 transition"
                      >
                        <td className="px-4 py-2 border border-[#5b0f4e]">
                          <a
                            href={`https://www.blockchain.com/btc/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                          >
                            {tx.hash.slice(0, 25)}...
                          </a>
                        </td>
                        <td className="px-4 py-2 border border-[#5b0f4e]">
                          {amountBTC.toFixed(8)}
                        </td>
                        <td className="px-3 py-2 border border-[#5b0f4e]">
                          {amountCurrency.toLocaleString(undefined, {
                            minimumFractionDigits: 3,
                          })}{" "}
                          {currency.name.toUpperCase()}
                        </td>
                        <td className="px-3 py-2 border border-[#5b0f4e]">
                          {new Date(tx.received).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2 text-center border border-[#5b0f4e]">
                          {tx.confirmations}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-[#6b0f4e] text-white font-semibold">
                    <td
                      className="px-3 py-2 border border-[#5b0f4e] text-right"
                      colSpan="2"
                    >
                      Total Bitcoin Spent:
                    </td>
                    <td className="px-3 py-2 border border-[#5b0f4e] text-left">
                      {totalBitcoinSpent.toFixed(9)} BTC
                    </td>
                    <td className="px-3 py-2 border border-[#5b0f4e] text-left">
                      {totalCurrencySpent.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                      })}{" "}
                      {currency.name.toUpperCase()}
                    </td>
                    <td colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CSVLink
              data={csvData}
              filename={`transactions-${address}.csv`}
              className="w-60 mt-5 items-center shadow-black shadow-xl cursor-pointer hover:bg-blue-600 bg-blue-300 text-black px-4 py-3 rounded-full text-center"
            >
              Export to CSV
            </CSVLink>
            {lastTransaction && (
              <button
                onClick={() => fetchTransactions(lastTransaction)}
                className="w-59 mx-5 mt-10 items-center shadow-black shadow-xl cursor-pointer hover:bg-green-600 bg-green-300 text-black px-4 py-3 rounded-full "
              >
                Load More Transactions
              </button>
            )}
          </div>
        )}
      </div>
      <BalanceTracker />
    </div>
  );
};

export default Bitcoin;

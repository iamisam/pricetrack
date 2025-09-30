import { useState } from "react";

const API_URL = "https://api.blockcypher.com/v1/btc/main/addrs/";
const BC_KEY = import.meta.env.VITE_BC_API;
export default function BalanceTracker() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBalance() {
    if (!address) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}${address}/balance?token=${BC_KEY}`,
      );
      const data = await response.json();

      if (data.error) {
        setError("Invalid Bitcoin address.");
        setBalance(null);
      } else {
        setBalance(data.balance / 1e8); // Convert satoshis to BTC
      }
    } catch (err) {
      setError("Failed to fetch balance.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-white p-8">
      <h2 className="text-3xl font-bold mb-6">💰 Bitcoin Balance Tracker</h2>

      <input
        type="text"
        placeholder="Enter BTC Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 w-96 bg-gray-900 text-white border border-gray-700 rounded mb-4"
      />
      <button
        onClick={fetchBalance}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold"
      >
        {loading ? "Checking..." : "Check Balance"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      {balance !== null && !error && (
        <p className="text-lg mt-4">
          Balance: <strong>{balance} BTC</strong>
        </p>
      )}
    </div>
  );
}

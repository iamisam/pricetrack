import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

const QRcode = () => {
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false); 
  const qrRef = useRef(null);

  const handleBitcoinAddressChange = (e) => {
    setBitcoinAddress(e.target.value);
  };

  const handleGenerateQR = () => {
    if (bitcoinAddress) {
      setQrGenerated(true); 
    }
  };

  const handleDownloadQR = () => {
    if(qrRef.current){
      html2canvas(qrRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = "qrcode.png";
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center text-red-800">Generate QR Code</h1>
        <p className="text-center font-semibold text-cyan-800">Generate a downloadable QR Code for your bitcoin address</p>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter Bitcoin Address"
          value={bitcoinAddress}
          onChange={handleBitcoinAddressChange}
        />
        
        <button
          onClick={handleGenerateQR}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mb-4"
        >
          Generate QR Code
        </button>

        {qrGenerated && bitcoinAddress && (
          <>
            <div className="flex justify-center mb-4" ref={qrRef}>
              <QRCode value={bitcoinAddress} size={256} />
            </div>
            <button
              onClick={handleDownloadQR}
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Download QR Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default QRcode;

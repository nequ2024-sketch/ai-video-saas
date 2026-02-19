'use client';
import { useState } from 'react';

export default function CreditCounter() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    console.log('Checkout disabled');
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button 
          onClick={handleCheckout} 
          disabled={loading}
          className="hover:text-purple-400 transition-colors disabled:opacity-50 text-white"
        >
          {loading ? '???? ???????...' : '??? ??????'}
        </button>
      </div>
    </div>
  );
}

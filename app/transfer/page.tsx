import TransferForm from '@/components/section/transfer/TransferForm';
import React from 'react';

export default function Page() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 h-screen">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="gradient-text">Transfer Solana</span>
        </h1>
        <TransferForm />
      </div>
    </>
  )
}

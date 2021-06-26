import React, { useState } from 'react'

import GoogleAddressLookup from 'react-rainbow-components/components/GoogleAddressLookup'

const Index = () => {
  const [address, setAddress] = useState(null)

  return (
    <div
      className="flex justify-center items-center p-2 flex-col"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <h1 className="font-bold text-4xl mb-5">Livrensemble</h1>

      <GoogleAddressLookup
        onChange={(value) => setAddress(value)}
        value={address}
        placeholder="Enter your address to find a restaurant"
        apiKey="AIzaSyAGfmv0CeO4LyBVAX6fN-gdHmyNFLRfm9M"
        className="w-full sm:w-1/2 lg:w-1/3"
      />
    </div>
  )
}
export default Index

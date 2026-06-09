import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className="flex-center w-full h-screen">
        <Image src="icons/loading-circle.svg" alt="Loading..." width={32} height={32} />
    </div>
  )
}

export default Loader
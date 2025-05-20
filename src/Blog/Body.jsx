import React from 'react'
import { Link } from 'react-router-dom';
const Body = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="flex flex-row items-center justify-center text-center mb-6 space-x-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            "Write what you know, and write what you love"
            </h1>

        <img src="/write.jpeg" alt="Writing" className="rounded-xl w-full max-w-md"/> </div>
      <div className="max-w-xl text-center mb-6">
        <p className="text-lg text-gray-600 italic">
          "The beauty of the internet is that it allows you to share your thoughts with the world, one blog post at a time."
        </p>
      </div>

      <div>
        <Link to ='/signup'><button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow transition-all duration-300">
          Start Writing
        </button></Link>
      </div>
    </div>
  )
}

export default Body

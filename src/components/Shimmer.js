import React from 'react'
import '../index.css'
const Shimmer = () => {
  return (
    <div className="flex ml-[-700px] resp">
      <div className="bg-gray-50 pt-16 sm:p-6 mt-[150px] mx-auto ml">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="w-24 h-5 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-gray-300 rounded-full mb-1"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="w-24 h-5 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="w-24 h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                  <div>
                    <div className="w-24 h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-28 h-10 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shimmer

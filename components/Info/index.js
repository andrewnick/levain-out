import React from 'react'

const Info = () => {
    return (
        <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <div className="font-bold text-xl mb-4">Current</div>
                </div>
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <div className="text-xl">Temp</div>
                    <div className="font-bold text-5xl mb-4 flex">26 <span className="font-bold text-2xl">°C</span></div>
                </div>
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <div className="text-xl">Humidity</div>
                    <div className="font-bold text-5xl mb-4 flex">100<span className="font-bold text-2xl">%</span></div>
                </div>
            </div>
        </form >
    );
}

export default Info;
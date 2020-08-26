import React from "react";

const Info: React.FC<{
  temperature: string;
  humidity: string;
  duration: string;
}> = ({ temperature, humidity, duration }) => {
  return (
    <form className="w-full max-w-lg mx-auto">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <div className="font-bold text-xl mb-4">Current</div>
        </div>
        <div className="w-1/3 px-3 mb-4 md:mb-0">
          <div className="text-xl">Temperature</div>
          <div className="font-bold text-5xl mb-4 flex">
            {temperature} <span className="font-bold text-2xl">°C</span>
          </div>
        </div>
        <div className="w-1/3 px-3 mb-4 md:mb-0">
          <div className="text-xl">Humidity</div>
          <div className="font-bold text-5xl mb-4 flex">
            {humidity}
            <span className="font-bold text-2xl">%</span>
          </div>
        </div>
        <div className="w-1/3 px-3 mb-4 md:mb-0">
          <div className="text-xl">Duration</div>
          <div className="font-bold text-5xl mb-4 flex">
            {duration}
            <span className="font-bold text-2xl">hr</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Info;

import React from "react";

const Info: React.FC<{
  temperature: number | undefined;
  humidity: number | undefined;
  duration: string;
}> = ({ temperature, humidity, duration }) => {
  return (
    <form className="w-full max-w-lg mx-auto">
      <div className="flex flex-wrap -mx-3 mt-3">
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
          <div className="font-bold text-5xl mb-4 flex">{duration}</div>
        </div>
      </div>
    </form>
  );
};

export default Info;

import React from "react";
import { mutation } from "../../graphql/gqlClient";

const START_RECORDING = `
  mutation startRecording {
    startRecording {
      id
    }
  }
`;

const STOP_RECORDING = `
  mutation stopRecording {
    stopRecording {
      id
    }
  }
`;

const RecordingControl = () => {
  return (
    <div>
      <button
        onClick={() => mutation(START_RECORDING)}
        className="w-full shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Start Recording
      </button>
      <button
        onClick={() => mutation(STOP_RECORDING)}
        className="w-full shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Stop Recording
      </button>
    </div>
  );
};

export default RecordingControl;

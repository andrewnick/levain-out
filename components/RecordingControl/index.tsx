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

const RecordingControl: React.FC<{
  isRecording: Function,
  recording: boolean;
}> = ({ isRecording, recording = false }) => {
  return (
    <div>
      {recording ? (
        <button
          onClick={() => {
            isRecording(false);
            mutation(STOP_RECORDING)
          }}
          className="w-full shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Stop Recording
        </button>
      ) : (
          <button
            onClick={() => {
              isRecording(true);
              mutation(START_RECORDING)
            }}
            className="w-full shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Start Recording
          </button>
        )}
    </div>
  );
};

export default RecordingControl;

import React from "react";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-lg w-full mx-4 p-8 bg-white rounded-2xl shadow-xl transform transition-all animate-fadeIn">
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse">
              500
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Server Error
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            We're experiencing some technical difficulties.
            <br />
            Our team has been notified and is working on it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto bg-white border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 ease-in-out"
            >
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error500;

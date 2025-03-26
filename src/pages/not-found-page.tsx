import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md mx-auto text-center space-y-10">
        {/* Error Status */}
        <div className="space-y-6">
          <h1 className="text-[120px] font-display font-bold text-primary leading-tight">
            404
          </h1>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-text-primary font-display">
              Page Not Found
            </h2>
            <p className="text-base text-text-secondary max-w-sm mx-auto">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>
        </div>

        {/* Action */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-display font-semibold rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

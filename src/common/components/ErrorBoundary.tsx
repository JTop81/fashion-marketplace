import React, { Component, ErrorInfo, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  is500Error: boolean;
}

const ErrorBoundaryContent = ({ is500Error }: { is500Error: boolean }) => {
  return <Navigate to={is500Error ? "/500" : "/404"} replace />;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    is500Error: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if it's a server error (500)
    const is500Error =
      error.message.includes("500") ||
      error.message.includes("server error") ||
      error.message.includes("network error");

    return {
      hasError: true,
      is500Error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorBoundaryContent is500Error={this.state.is500Error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

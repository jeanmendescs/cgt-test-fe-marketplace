import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@components/Button";
import "./ErrorBoundary.scss";

type TErrorBoundary = {
  children: ReactNode;
  fallback?: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<TErrorBoundary, TErrorBoundaryState> {
  constructor(props: TErrorBoundary) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service (e.g., Sentry, LogRocket)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__content">
              <h1 className="error-boundary__title">Something went wrong</h1>
              <p className="error-boundary__message">
                We're sorry, but something unexpected happened. Please try
                refreshing the page or contact support if the problem persists.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="error-boundary__details">
                  <summary className="error-boundary__summary">
                    Error Details (Development Only)
                  </summary>
                  <pre className="error-boundary__error">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="error-boundary__actions">
                <Button.Contained onClick={this.handleReset}>
                  Try Again
                </Button.Contained>
                <Button.Outlined
                  className="reload-button"
                  onClick={this.handleReload}
                >
                  Reload Page
                </Button.Outlined>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

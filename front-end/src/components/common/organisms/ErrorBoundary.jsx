import { Component } from "react";
import { ShieldAlert, RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gradient-to-br from-warm-50 via-red-50/20 to-warm-100 min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center space-y-8 animate-fadeIn">
            {/* Warning Shield Icon */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-red-50 rounded-full shadow-md border border-red-100">
              <div className="absolute inset-0 bg-red-500/5 rounded-full animate-pulse" />
              <ShieldAlert size={48} className="text-primary relative z-10" />
            </div>

            {/* Error Messages */}
            <div className="space-y-3">
              <h1 className="font-playfair text-3xl font-bold text-warm-900">
                Oops, Something went wrong
              </h1>
              <p className="text-warm-600 text-sm leading-relaxed max-w-sm mx-auto">
                We ran into an unexpected problem. Don't worry, our team has been notified and we are looking into it.
              </p>
              {process.env.NODE_ENV !== "production" && this.state.error && (
                <div className="text-left bg-gray-950/90 text-red-400 p-4 rounded-xl text-xs font-mono overflow-auto max-h-40 max-w-full border border-gray-800 shadow-inner">
                  {this.state.error.toString()}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} className="animate-spin-slow" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-warm-800 bg-white border border-warm-300 rounded-full hover:bg-warm-100 hover:text-primary transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <Home size={16} />
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

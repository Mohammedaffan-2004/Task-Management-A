import React, { Component } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0B0C10] via-[#0F1629] to-[#111827] relative overflow-hidden text-gray-200">
          {/* Floating glows */}
          <div className="absolute w-104 h-104 bg-[#3B82F6]/25 blur-3xl rounded-full -top-24 -left-20 animate-glowMove"></div>
          <div className="absolute w-104 h-104 bg-[#06B6D4]/25 blur-3xl rounded-full bottom-0 right-0 animate-glowMoveDelay"></div>

          {/* Error Card */}
          <div className="relative z-10 max-w-lg w-full bg-linear-to-br from-[#0F172A]/95 via-[#1E253F]/85 to-[#111827]/95 backdrop-blur-2xl border border-[#1E253F]/70 rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(59,130,246,0.25)] animate-fadeIn">
            {/* Icon */}
            <div className="w-20 h-20 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#3B82F6]/30 shadow-inner shadow-[#3B82F6]/20">
              <AlertTriangle className="text-[#60A5FA] w-10 h-10 animate-bounce-slow" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold bg-linear-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-3 tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
              Oops — Something Went Wrong
            </h1>
            <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
              Don’t worry — your data is safe. Looks like the app hit a snag.  
              You can refresh or return to your dashboard.
            </p>

            {/* Dev Details (Visible in DEV) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left mb-6 bg-[#121225]/70 border border-[#1E253F]/60 rounded-lg p-4 backdrop-blur-sm">
                <summary className="text-sm text-[#60A5FA] font-medium cursor-pointer mb-2">
                  Show Error Details
                </summary>
                <pre className="text-xs text-[#F87171] overflow-auto max-h-40 whitespace-pre-wrap leading-relaxed">
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      {"\n\n"}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 bg-linear-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] px-6 py-2 rounded-md text-sm font-medium text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03]"
              >
                <Home size={16} />
                Go to Dashboard
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 border border-[#3B82F6]/40 text-[#93C5FD] hover:text-white hover:bg-[#3B82F6]/20 px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-[1.03]"
              >
                <RefreshCcw size={16} />
                Reload Page
              </button>
            </div>
          </div>

         
          <style>{`
            @keyframes fadeIn {
              0% { opacity: 0; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

            @keyframes glowMove {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
              50% { transform: translate(30px, 20px) scale(1.05); opacity: 1; }
            }
            .animate-glowMove { animation: glowMove 10s ease-in-out infinite alternate; }
            .animate-glowMoveDelay { animation: glowMove 12s ease-in-out infinite alternate-reverse; }

            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            .animate-bounce-slow { animation: bounce-slow 2.8s ease-in-out infinite; }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

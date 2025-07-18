import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 mt-20 flex flex-col ">
          <h2 className="text-xl font-semibold mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="mb-2">
            Please try refreshing the page or come back later.
          </p>
          <h2 className="text-xl font-semibold mb-2 mt-4">
            ¡Uy! Algo salió mal.
          </h2>
          <p className="mb-2">
            Por favor, intentá recargar la página o volvé más tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 rounded-full px-4 py-2 bg-primary-400 text-white  hover:bg-primary-500 dark:bg-primary-200 dark:hover:bg-primary-300"
          >
            Refresh / Recargar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

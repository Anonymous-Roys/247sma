import { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleCatchError = (error: Error, errorInfo: string = "error") => {
    console.error("Error Boundary caught an error:", error, errorInfo);
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      // Perform any side effects here like logging the error to an error reporting service
    }
  }, [hasError]);

  if (hasError) {
    // Fallback UI when an error occurs
    return (
      <div className="error_page">
        <div className="error__content-page">
          <h1>Something went wrong!</h1>
          <p>We're sorry, an error occurred.</p>
        </div>
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (error) {
    handleCatchError(error as Error);
    return null;
  }
};

export default ErrorBoundary;

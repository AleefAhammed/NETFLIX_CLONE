import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1 className="error-heading">Oops! Something went wrong.</h1>
      <p className="error-message">
        {error.status === 404 ? "Page not found." : "An unexpected error occurred."}
      </p>
      <a href="/" className="error-link">Go Home</a>
    </div>
  );
}

export default ErrorPage;

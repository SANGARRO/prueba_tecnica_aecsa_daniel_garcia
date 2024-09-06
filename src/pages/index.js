import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Importa Navigate
import Register from "./Register";
import Principal from "./principal";
import Chat from "./Chat";
import Information from "./Information";
import "bootstrap/dist/css/bootstrap.min.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error captured by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/chat" component={Chat} />
          <Route path="/information" component={Information} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/Auth.context';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import 'materialize-css';

function App() {
  const { token, login, logout, userID, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ login, logout, token, userID, isAuthenticated }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

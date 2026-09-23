import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import {GoogleOAuthProvider} from '@react-oauth/google';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Toaster richColors/>

    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route
          path = "/login"
          element={<LoginPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path = "/"
            element={<HomePage />}
          />
        </Route>

        <Route
          path = "*"
          element={<NotFound />}
        />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App

import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/theme-provider";
import Login from "./pages/auth/login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { ProtectedRoute } from "./routes/protected-route";
import Plans from "./pages/plan";
import PaymentPage from "./pages/payment";

import { loadStripe } from "@stripe/stripe-js";
import MembershipPage from "./pages/membership";
import RegisterPage from "./pages/auth/register";
import { SubProtectedRoute } from "./routes/sub-route";
import { Navbar } from "./components/layout/Navbar";

export const stripePromise = loadStripe(
  ""
);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" />
        <AuthProvider>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              {/* Public */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
                <Route element={<SubProtectedRoute />}>
                  <Route path="/" element={<MembershipPage />} />
                </Route>

                <Route path="/plans" element={<Plans />} />
                <Route path="/payment/:priceId" element={<PaymentPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

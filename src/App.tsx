import { Route, Switch } from "wouter";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Kyc from "./pages/Kyc";
import Developers from "./pages/Developers";
import Institutional from "./pages/Institutional";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import DeveloperSignup from "./pages/developers/Signup";
import DeveloperPricing from "./pages/developers/Pricing";
import AppBuilder from "./pages/developers/AppBuilder";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/login" component={Login} />
        <Route path="/kyc">
          <ProtectedRoute>
            <Kyc />
          </ProtectedRoute>
        </Route>
        
        {/* Protected Routes */}
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/:subpage*">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        
        <Route path="/developers" component={Developers} />
        <Route path="/developers/signup" component={DeveloperSignup} />
        <Route path="/developers/pricing" component={DeveloperPricing} />
        <Route path="/developers/builder" component={AppBuilder} />
        <Route path="/institutional" component={Institutional} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/security" component={Security} />
        <Route>404: Page Not Found</Route>
      </Switch>
    </Layout>
  );
}

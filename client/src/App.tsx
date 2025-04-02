import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import PasswordsPage from "@/pages/passwords-page";
import FilesPage from "@/pages/files-page";
import NextOfKinPage from "@/pages/next-of-kin-page";
import SecurityPage from "@/pages/security-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      {/* Auth page */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected routes */}
      <Route path="/" component={() => <ProtectedRoute component={DashboardPage} />} />
      <Route path="/passwords" component={() => <ProtectedRoute component={PasswordsPage} />} />
      <Route path="/files" component={() => <ProtectedRoute component={FilesPage} />} />
      <Route path="/next-of-kin" component={() => <ProtectedRoute component={NextOfKinPage} />} />
      <Route path="/security" component={() => <ProtectedRoute component={SecurityPage} />} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

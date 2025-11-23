import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import { AppHeader } from "@/components/app-header";
import { RechargeModal } from "@/components/recharge-modal";
import { Footer } from "@/components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import RefundPolicy from "@/pages/refund-policy";
import CancellationPolicy from "@/pages/cancellation-policy";
import SafetyGuidelines from "@/pages/safety-guidelines";
import CustomerDashboard from "@/pages/customer-dashboard";
import TechnicianDashboard from "@/pages/technician-dashboard";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";

function Router() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLocation('/');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const handleRecharge = async (amount: number) => {
    if (!user) return;
    
    try {
      const result = await apiRequest('POST', '/api/wallet/recharge', { userId: user.id, amount });
      if (user) {
        const updatedUser = { ...user, walletBalance: result.newBalance };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      toast({
        title: 'Wallet Recharged!',
        description: `₹${amount} has been added to your wallet`,
      });
    } catch {
      toast({
        title: 'Recharge Failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  const showHeader = !['/', '/login', '/signup'].includes(location);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && (
        <AppHeader
          walletBalance={user ? Number(user.walletBalance) : undefined}
          onRecharge={() => setRechargeModalOpen(true)}
          onLogout={handleLogout}
          userName={user?.name}
          userRole={user?.role}
        />
      )}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route path="/cancellation-policy" component={CancellationPolicy} />
          <Route path="/safety-guidelines" component={SafetyGuidelines} />
          <Route path="/dashboard">
            {user?.role === 'technician' ? <TechnicianDashboard /> : <CustomerDashboard />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {user && (
        <RechargeModal
          open={rechargeModalOpen}
          onClose={() => setRechargeModalOpen(false)}
          onRecharge={handleRecharge}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Router />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

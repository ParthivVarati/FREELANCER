
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import ProviderLogin from "./pages/ProviderLogin";
import ProviderRegister from "./pages/ProviderRegister";
import ProviderDashboard from "./pages/ProviderDashboard";
import SeekerLogin from "./pages/SeekerLogin";
import SeekerRegister from "./pages/SeekerRegister";
import SeekerProfile from "./pages/SeekerProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/provider/login" element={<ProviderLogin />} />
              <Route path="/provider/register" element={<ProviderRegister />} />
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/seeker/login" element={<SeekerLogin />} />
              <Route path="/seeker/register" element={<SeekerRegister />} />
              <Route path="/seeker/profile" element={<SeekerProfile />} />
              <Route path="/seeker/profile/:id" element={<SeekerProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

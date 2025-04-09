
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DonorDashboard from "./pages/DonorDashboard";
import DonationHistory from "./pages/DonationHistory";
import DonationCertificates from "./pages/DonationCertificates";
import ImpactMap from "./pages/ImpactMap";
import NewDonation from "./pages/NewDonation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/history" element={<DonationHistory />} />
          <Route path="/donor/certificates" element={<DonationCertificates />} />
          <Route path="/donor/impact-map" element={<ImpactMap />} />
          <Route path="/donor/donate" element={<NewDonation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

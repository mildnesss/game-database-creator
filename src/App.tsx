import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameDataProvider } from "@/contexts/GameDataContext";
import Index from "./pages/Index";
import DataManagement from "./pages/DataManagement";
import PriceSearch from "./pages/PriceSearch";
import GenreYearSearch from "./pages/GenreYearSearch";
import Statistics from "./pages/Statistics";
import DatabaseInfo from "./pages/DatabaseInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/data-management" element={<DataManagement />} />
            <Route path="/price-search" element={<PriceSearch />} />
            <Route path="/genre-year-search" element={<GenreYearSearch />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/database-info" element={<DatabaseInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameDataProvider>
  </QueryClientProvider>
);

export default App;

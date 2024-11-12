import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainPage } from "./pages/MainPage";
import { AboutPage } from "./pages/AboutPage";
import { PricingPage } from "./pages/PricingPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { useStore } from "./store/useStore";

const queryClient = new QueryClient();

function App() {
  const { themeMode } = useStore();

  useEffect(() => {
    // Initialize Google AdMob
    (window as any).admob = (window as any).admob || {};
    (window as any).admob.initialize = (appId: string) => {
      // Initialize AdMob with your app ID
      console.log(`AdMob initialized with app ID: ${appId}`);
    };
    
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <div className={themeMode}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
            theme="light"
            transition={Bounce}
          />
        </div>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;

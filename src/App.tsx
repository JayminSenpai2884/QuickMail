import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeaturesPage } from "./pages/FeaturesPage";
import { MainPage } from "./pages/MainPage";
import { useStore } from "./store/useStore";
  
const queryClient = new QueryClient();

function App() {
  const { themeMode } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <div className={`relative min-h-screen w-full ${themeMode}`}>
          <div className="absolute inset-0 -z-10 h-full w-full bg-blue-500"></div>

          <div className="relative h-full w-full bg-slate-950">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<FeaturesPage />} />
                <Route path="/generate" element={<MainPage />} />
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
        </div>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;

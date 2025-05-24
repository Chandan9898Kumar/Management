import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Loader from './components/CircularLoader/Loader'
const DashBoard = lazy(() => import("./pages/DashBoard"));
const NotFound = lazy(() => import("./error/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

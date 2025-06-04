import { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"; // Import Navigate
import FarmersLayout from "./Layout"; // Layout component for farmers
import ErrorBoundary from "@/modules/farmers/container/ErrorBoundary";
import Overview from "@/modules/farmers/container/pages/Overview";
import Profile from "@/modules/farmers/container/pages/Profile";
import Products from "@/modules/farmers/container/pages/Products";
import Orders from "@/modules/farmers/container/pages/Orders";
import Farms from "@/modules/farmers/container/pages/Farms";
import Investments from "@/modules/farmers/container/pages/Investments";
import FarmNotifications from "@/modules/farmers/container/pages/Notification";
import CampaignDetail from "@/modules/farmers/container/pages/CampaignDetail";
import ProductDetailPage from "@/modules/farmers/container/pages/ProductDetailPage";
import CropAnalytics from "@/modules/farmers/container/pages/farmForMe/CropAnalytics";
import SoilAnalytics from "@/modules/farmers/container/pages/farmForMe/SoilAnalytics";
import ScarecrowDashboard from "@/modules/farmers/container/pages/farmForMe/Scarescrow";
import AMAnalytics from "@/modules/farmers/container/pages/farmForMe/AMAnalytics";
import ClimateDashboard from "@/modules/farmers/container/pages/farmForMe/Climate";
import FarmMarketplace from "@/modules/farmers/container/pages/FarmMarketplace";

import SignUp from "@/modules/farmers/container/pages/SignUp";
import Login from "@/modules/farmers/container/pages/Login";
import ProtectedRoute from "@/modules/farmers/components/auth/ProtectedRoute";
import NotFound from "@/modules/farmers/container/pages/NotFound";
import EditProductPage from "@/modules/farmers/container/pages/EditProductPage";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/farmers" replace />, // Default route redirects to /farmers
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "farmers",
      element: (
        <ProtectedRoute>
          <ErrorBoundary >
            <FarmersLayout />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Navigate to="overview" replace /> },
        { path: "overview", element: <Overview /> },
        { path: "profile", element: <Profile /> },
        { 
          path: "products", 
          element: "",
          children:[
            { index: true, element: <Products /> },
            { path:"edit/:id", element:<EditProductPage />},
          ] 
        },
        { path: "orders", element: <Orders /> },
        { path: "farms", element: <Farms /> },
        { path: "investments", element: <Investments /> },
        { path: "campaign-detail", element: <CampaignDetail /> },
        { path: "notification", element: <FarmNotifications /> },
        { path: "marketplace", element: <FarmMarketplace /> },
        { path: "marketplace/product/:slug", element: <ProductDetailPage /> },
        { path: "crop-analytics", element: <CropAnalytics /> },
        { path: "soil-analytics", element: <SoilAnalytics /> },
        { path: "scarecrow", element: <ScarecrowDashboard /> },
        { path: "am-analytics", element: <AMAnalytics /> },
        { path: "climate", element: <ClimateDashboard /> },
        {path: "*",element: <Navigate to="/farmers" replace />,}
      ],

    },
     {
      path: "*",
      element: <NotFound />,
    },

  ]);

  return (
    <Suspense fallback="Loading">
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Router;

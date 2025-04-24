import { Navigate } from "react-router-dom";
import Home from "./views/Home";
import Itinerary from "./views/Itinerary";
import TripDetails from "./views/TripDetails/TripDetails";

const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "itinerary",
    path: "/itinerary",
    element: <Itinerary />,
  },
  {
    name: "trip-details-redirect",
    path: "/trip-details",
    element: <Navigate to="/" replace />,
  },
  {
    name: "trip-details-with-id",
    path: "/trips/:id",
    element: <TripDetails />,
  }
];

export default routes;
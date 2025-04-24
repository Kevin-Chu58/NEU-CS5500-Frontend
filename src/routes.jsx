import { Navigate } from "react-router-dom";
import Home from "./views/Home/index";
import TripDetails from "./views/TripDetails/TripDetails";
import UserItineraries from "./views/UserItinerary/Index";
import Itinerary from "./views/Itinerary/index";

const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "itinerary",
    path: "/itinerary/:id",
    element: <Itinerary />,
  },
  {
    name: "UserItinerary",
    path: "/my",
    element: <UserItineraries />,
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

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
    name: "trip-details",
    path: "/trip-details",
    element: <TripDetails />,
  }
];

export default routes;
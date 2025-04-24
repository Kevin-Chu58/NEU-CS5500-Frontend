import Home from "./views/Home";
import Itinerary from "./views/Itinerary";
import UserItineraries from "./views/UserItinerary/Index";
import TripDetails from "./views/TripDetails/TripDetails";

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
    name: "trip-details",
    path: "/trip-details",
    element: <TripDetails />,
  }
];

export default routes;
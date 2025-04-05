import Home from "./views/Home";
import Itinerary from "./views/Itinerary";
import UserItineraries from "./views/UserItinerary/Index";

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
    path: "/useritinerary",
    element: <UserItineraries />,
  }
];

export default routes;
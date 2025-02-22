import Home from "./views/Home";
import Itinerary from "./views/Itinerary";

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
  }
];

export default routes;
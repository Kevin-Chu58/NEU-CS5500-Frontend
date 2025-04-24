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

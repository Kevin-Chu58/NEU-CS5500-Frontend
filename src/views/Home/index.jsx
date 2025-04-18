import {
  Container,
  Typography,
  Stack,
  IconButton,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlannerSearch from "../../components/PlannerSearch/index.tsx";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import http from "../../services/http.ts";

const Home = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSorted, setIsSorted] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleSearch = async (term) => {
    const query = http.toQueryString({ name: term });
    const fullUrl = `${http.apiBaseURLs.api}/api/trips${query}`;
    console.log("🟡 Fetching from:", fullUrl);
    try {
      const data = await http.get(
        http.apiBaseURLs.api,
        `api/trips${query}`,
        ""
      );
      console.log("🟢 Response:", data);
      setResults(data);
      setSearchTerm(term);
      setCurrentPage(0);
      setHasSearched(true);
      setIsSorted(false);
    } catch (err) {
      console.error("❌ Failed to fetch trips:", err);
    }
  };

  /*
  const handleSearch = async (term) => {
    // fake data

    const fakeData = [
      {
        Id: 1,
        Name: "Trip to Tokyo",
        CreatedAt: "2024-01-01T10:00:00Z",
        LastUpdatedAt: "2024-01-02T12:00:00Z",
        Description: "Explore sushi, temples, and tech in vibrant Tokyo.",
      },
      {
        Id: 2,
        Name: "Paris Adventure",
        CreatedAt: "2023-12-01T09:00:00Z",
        LastUpdatedAt: "2023-12-02T18:00:00Z",
        Description: "A romantic getaway through Parisian art and cafes.",
      },
      {
        Id: 3,
        Name: "Seattle Weekend",
        CreatedAt: "2024-03-15T08:30:00Z",
        LastUpdatedAt: "2024-03-16T14:20:00Z",
        Description: "Coffee, rain, and Pike Place Market vibes.",
      },
      {
        Id: 4,
        Name: "New York Highlights",
        CreatedAt: "2023-11-10T10:15:00Z",
        LastUpdatedAt: "2023-11-12T13:30:00Z",
        Description: "Fast-paced adventure through the Big Apple.",
      },
      {
        Id: 5,
        Name: "Barcelona Escape",
        CreatedAt: "2024-04-01T09:00:00Z",
        LastUpdatedAt: "2024-04-02T10:00:00Z",
        Description: "Sun, beaches, and Gaudí architecture everywhere.",
      },
      {
        Id: 6,
        Name: "Iceland Road Trip",
        CreatedAt: "2023-10-05T11:00:00Z",
        LastUpdatedAt: "2023-10-06T16:30:00Z",
        Description: "Waterfalls, volcanoes, and northern lights await.",
      },
      {
        Id: 7,
        Name: "Bangkok Food Tour",
        CreatedAt: "2024-02-20T12:00:00Z",
        LastUpdatedAt: "2024-02-22T13:00:00Z",
        Description: "A street food heaven with spicy surprises.",
      },
      {
        Id: 8,
        Name: "Cape Town Safari",
        CreatedAt: "2023-09-12T08:00:00Z",
        LastUpdatedAt: "2023-09-13T15:45:00Z",
        Description: "From Table Mountain to wildlife wonders.",
      },
      {
        Id: 9,
        Name: "Sydney & the Coast",
        CreatedAt: "2024-05-10T09:30:00Z",
        LastUpdatedAt: "2024-05-11T14:20:00Z",
        Description: "Opera House, Bondi Beach, and koalas!",
      },
      {
        Id: 10,
        Name: "Kyoto Temple Trail",
        CreatedAt: "2024-03-01T07:50:00Z",
        LastUpdatedAt: "2024-03-02T12:10:00Z",
        Description: "Peaceful shrines, gardens, and geishas.",
      },
      {
        Id: 11,
        Name: "Toronto City Life",
        CreatedAt: "2023-08-18T09:00:00Z",
        LastUpdatedAt: "2023-08-19T10:45:00Z",
        Description: "Multicultural food, art, and skyline views.",
      },
    ];
    setResults(fakeData);
    setSearchTerm(term);
    setCurrentPage(0);
    setHasSearched(true);
    setIsSorted(false);
  };
*/
  const sortedResults = [...results].sort((a, b) => {
    const aTime = new Date(a.LastUpdatedAt).getTime();
    const bTime = new Date(b.LastUpdatedAt).getTime();

    return sortOrder === "asc" ? bTime - aTime : aTime - bTime;
  });

  const displayResults = isSorted ? sortedResults : results;

  const paginatedResults = displayResults.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const hasPrevious = currentPage > 0;
  const hasNext = (currentPage + 1) * itemsPerPage < displayResults.length;

  const handlePrev = () => {
    if (hasPrevious) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNext) setCurrentPage(currentPage + 1);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          height: hasSearched ? "auto" : "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: hasSearched ? "flex-start" : "flex-start",
          alignItems: "center",
          pt: hasSearched ? 4 : "20vh",
          transition: "all 0.5s ease",
        }}
      >
        <Typography
          color="primary"
          variant="h2"
          sx={{
            my: 1,
            fontFamily: "inherit",
            fontWeight: "bold",
            fontSize: "64px",
          }}
        >
          TAKE ME TO
        </Typography>

        <PlannerSearch onSearch={handleSearch} />
        {results.length > 0 && (
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setIsSorted(true);
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              }}
            >
              Sort by Last Updated:{" "}
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </Button>

            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => setIsSorted(false)}
              disabled={!isSorted}
            >
              Cancel Sort
            </Button>
          </Box>
        )}
      </Box>

      {paginatedResults.length > 0 && (
        <Stack
          spacing={2}
          sx={{
            mt: 4,
            px: 2,
            alignItems: "center",
          }}
        >
          {paginatedResults.map((trip, index) => (
            <Card
              key={index}
              onClick={() => navigate(`/trips/${trip.Id}`)}
              sx={{
                cursor: "pointer",
                p: 1.5,
                maxWidth: 800,
                width: "100%",
                borderRadius: 2,
                boxShadow: 2,
                transition: "box-shadow 0.2s ease-in-out",
                ":hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#2e7d32",
                    mb: 0.5,
                  }}
                >
                  🌍 {trip.Name}
                </Typography>
                <Typography variant="body2">
                  Created: {new Date(trip.CreatedAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Updated: {new Date(trip.LastUpdatedAt).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  noWrap
                  sx={{
                    fontSize: "1rem",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {trip.Description}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              gap: 2,
            }}
          >
            <IconButton onClick={handlePrev} disabled={!hasPrevious}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography>{`Page ${currentPage + 1}`}</Typography>
            <IconButton onClick={handleNext} disabled={!hasNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Stack>
      )}

      {hasSearched && paginatedResults.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No trips found for "{searchTerm}"
        </Typography>
      )}
    </Container>
  );
};

export default Home;

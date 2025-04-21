import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    Stack,
    CircularProgress,
} from "@mui/material";

const UserItinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const dummyTrips = [
        { id: 1, title: "Japan Adventure" },
        { id: 2, title: "Paris Getaway" },
        { id: 3, title: "California Roadtrip" },
    ];

    useEffect(() => {
        const fetchWithTimeout = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            try {
                const response = await fetch("/trips/my", { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }

                const data = await response.json();

                if (data.length === 0) {
                    setItineraries(dummyTrips);
                } else {
                    const tripData = data.map((trip) => ({
                        id: trip.Id,
                        title: trip.Name,
                    }));
                    setItineraries(tripData);
                }
            } catch (error) {
                console.error("Fetch failed or timed out. Using dummy data.", error);
                setItineraries(dummyTrips);
            } finally {
                setLoading(false);
            }
        };

        fetchWithTimeout();
    }, []);

    const handleDelete = (id) => {
        console.log("Delete itinerary", id);
        // Add your delete logic here
    };

    return (
        <Container maxWidth={false} sx={{ mt: 4, fontFamily: "cursive" }}>
            <Typography
                color="primary"
                variant="h4"
                sx={{
                    mb: 2,
                    fontFamily: "inherit",
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "default",
                }}
            >
                My Itineraries
            </Typography>

            <Box
                sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    mx: "auto",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    itineraries.map((itinerary) => (
                        <Paper
                            key={itinerary.id}
                            elevation={3}
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderRadius: 2,
                                bgcolor: "white",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: "inherit", fontWeight: 500 }}
                            >
                                {itinerary.title}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                                    sx={{ borderRadius: 5 }}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(itinerary.id)}
                                    sx={{ borderRadius: 5 }}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Paper>
                    ))
                )}
            </Box>
        </Container>
    );
};

export default UserItinerary;

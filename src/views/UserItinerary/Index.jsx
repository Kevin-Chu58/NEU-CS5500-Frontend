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

    useEffect(() => {
        // Replace this with your real fetch call
        setTimeout(() => {
            setItineraries([
                { id: 1, title: "Japan Adventure" },
                { id: 2, title: "Paris Getaway" },
                { id: 3, title: "California Roadtrip" },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleEdit = (id) => {
        console.log("Edit itinerary", id);
        // Add your edit logic here
    };

    const handleDelete = (id) => {
        console.log("Delete itinerary", id);
        // Add your delete logic here
    };

    const navigate = useNavigate();

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
                            elevation={2}
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
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
                                variant="outlined"
                                onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                            >
                                View
                            </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEdit(itinerary.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(itinerary.id)}
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

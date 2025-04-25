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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from "@mui/material";
import tripService from "../../services/trip.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { getGlobalData } from "../../global.js";

const UserItinerary = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false)
    }, [itineraries]);
    
    useEffect(() => {
        const getMyTrips = async () => {
            try {
                if (!isAuthenticated) {
                    console.log("User not logged in, unable to load trips");
                    setLoading(false);
                    return;
                }
                
                const globalData = getGlobalData();
                if (!globalData || !globalData.accessToken) {
                    console.log("Access token not found, waiting...");
                    return;
                }
                
            setAccessToken(globalData.accessToken);
                const trips = await tripService.getMyTrips(globalData.accessToken);
                setItineraries(trips);
                setError(null);
            } catch (err) {
                console.error("Failed to get trips:", err);
                setError(`Failed to get trips: ${err.message || "Unknown error"}`);
            } finally {
                setLoading(false);
            }
        }
        
        getMyTrips();
    }, [isAuthenticated, getGlobalData(), loading]);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await tripService.setTripIsHidden(selectedId, true, accessToken);
        setLoading(true);
        setOpenDialog(false);
            // Refresh list
            const trips = await tripService.getMyTrips(accessToken);
            setItineraries(trips);
        } catch (err) {
            console.error("Failed to delete trip:", err);
            setError(`Failed to delete trip: ${err.message || "Unknown error"}`);
            setOpenDialog(false);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <Container maxWidth="xl">
                <Alert severity="error">
                    {error}
                </Alert>
            </Container>
        );
    }

    // Show login prompt when not authenticated
    if (!isAuthenticated) {
        return (
            <Container maxWidth="xl">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    textAlign: 'center',
                    gap: 2
                }}>
                    <Typography variant="h5">Please login to view your itineraries</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please click the "Login" button in the top right corner
                    </Typography>
                </Box>
            </Container>
        );
    }

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
                ) : itineraries.length === 0 ? (
                    <Typography variant="body1" textAlign="center" sx={{ py: 4 }}>
                        You haven't created any itineraries yet
                    </Typography>
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
                                {itinerary.name}
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
                                    onClick={() => handleDeleteClick(itinerary.id)}
                                    sx={{ borderRadius: 5 }}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Paper>
                    ))
                )}
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this itinerary?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserItinerary;

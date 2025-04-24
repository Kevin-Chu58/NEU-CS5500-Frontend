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
} from "@mui/material";
import tripService from "../../services/trip.ts";
import { useAuth0 } from "@auth0/auth0-react";

const UserItinerary = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

    }, [itineraries]);

    useEffect(() => {
        const updateAccessToken = async () => {
            setAccessToken(await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                }
            }));
        }
        
        if (isAuthenticated)
            updateAccessToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    
    useEffect(() => {
        const getMyTrips = async () => {
            setItineraries(await tripService.getMyTrips(accessToken));
        }
        if (loading && accessToken) {
            getMyTrips();
            setLoading(false);
            // console.log(accessToken);
        }
    }, [accessToken, loading]);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        tripService.setTripIsHidden(selectedId, true, accessToken);
        setLoading(true);
        setOpenDialog(false);
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
                        No
                    </Button>
                    <Button onClick={() => handleDeleteConfirm()} color="error" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserItinerary;

import {
    Container,
    Typography,
    Grid2 as Grid,
    Skeleton,
    Stack,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Snackbar,
    Box,
    Avatar,
    Paper,
    Card,
    CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import tripService from "../../services/trip.ts";
import "./TripDetails.css";
import ImageThumb from "../../components/ImageThumb/index.jsx";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// JWT parse function
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const TripDetails = () => {
    const { id } = useParams();
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    // Form dialog control
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    
    // 添加大行程编辑状态控制
    const [mainTripDialogOpen, setMainTripDialogOpen] = useState(false);
    const [mainTripFormData, setMainTripFormData] = useState({ name: '', description: '' });

    // Get access token
    useEffect(() => {
        const getToken = async () => {
            try {
                if (isAuthenticated) {
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                        }
                    });
                    console.log("TripDetails: Successfully got token");
                    setAccessToken(token);
                } else {
                    console.log("TripDetails: User not authenticated");
                }
            } catch (error) {
                console.error("Failed to get token:", error);
            }
        };

        getToken();
    }, [getAccessTokenSilently, isAuthenticated]);

    // Debug logger
    useEffect(() => {
        console.log("Current route param - id:", id);
        console.log("Dialog state:", dialogOpen);
        console.log("Authentication status:", isAuthenticated ? "Logged in" : "Not logged in");
        console.log("Access token status:", accessToken ? "Obtained" : "Not obtained");
    }, [id, dialogOpen, accessToken, isAuthenticated]);

    // Get Trip details
    useEffect(() => {
        const fetchTripDetails = async () => {
            if (!id) {
                console.error("No ID provided in URL");
                setError("No trip ID provided");
                setLoading(false);
                return;
            }
            
            if (!isAuthenticated) {
                console.log("User not logged in, unable to load data");
                setError("Please login to view trip details");
                setLoading(false);
                return;
            }
            
            if (!accessToken) {
                console.log("Token not yet loaded, waiting");
                return; // Wait for token to load
            }
            
            setLoading(true);
            try {
                console.log("Starting to fetch Trip ID:", id);
                
                const data = await tripService.getTripDetail(id, accessToken);
                
                if (data) {
                    setTrip(data);
                    setError(null);
                    console.log("Trip data successfully set to state:", data);
                } else {
                    console.error("API returned empty data");
                    setError("Received empty data from server");
                }
            } catch (err) {
                console.error("Failed to get trip details:", err);
                setError(`Failed to get trip details: ${err.message || "Unknown error"}`);
            } finally {
                setLoading(false);
            }
        };

        if (id && accessToken && isAuthenticated) {
            console.log("Triggering fetchTripDetails, ID:", id);
            fetchTripDetails();
        } else if (!accessToken && isAuthenticated) {
            console.log("Waiting for access token...");
        } else if (!isAuthenticated) {
            setLoading(false);
        } else {
            console.error("No ID parameter in URL");
            setError("Missing trip ID in URL");
            setLoading(false);
        }
    }, [id, accessToken, isAuthenticated]);

    const handleAdd = () => {
        console.log("handleAdd called");
        try {
        setFormData({ id: null, name: '', description: '' });
            console.log("Form data reset");
            
        setIsEditing(false);
            console.log("isEditing set to false");
            
            setDialogOpen(true);
            console.log("dialogOpen set to true");
            
            // Force re-render
            setTimeout(() => {
                console.log("After timeout, dialog state:", dialogOpen);
                if (!dialogOpen) {
                    console.log("Forcing dialog open again");
        setDialogOpen(true);
                }
            }, 100);
        } catch (error) {
            console.error("Error in handleAdd:", error);
        }
    };

    const handleEdit = (subTrip) => {
        setFormData({ 
            id: subTrip.id, 
            name: subTrip.name, 
            description: subTrip.description || '' 
        });
        setIsEditing(true);
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!trip || !accessToken || !isAuthenticated) {
            console.error("Cannot submit:", !trip ? "No trip data" : !accessToken ? "No access token" : "User not logged in");
            setSnackbar({
                open: true,
                message: 'Cannot complete operation, please ensure you are logged in',
                severity: 'error'
            });
            return;
        }
        
        if (!formData.name) {
            setSnackbar({
                open: true,
                message: 'Name cannot be empty',
                severity: 'error'
            });
            return;
        }
        
        setSubmitting(true);
        try {
            console.log("Starting handleSubmit, isEditing:", isEditing);
            
            // Prepare correct data format according to API docs
            const submitData = {
                name: formData.name,
                description: formData.description || '' // Ensure description is not undefined
            };
            console.log("Form data to submit:", submitData);

            if (isEditing) {
                console.log("Updating small trip with ID:", formData.id);
                // Use official API service to update small trip
                const updatedSmallTrip = await tripService.updateSmallTrip(formData.id, submitData, accessToken);
                console.log("Update response:", updatedSmallTrip);

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: prev.smallTrips.map((st) =>
                        st.id === formData.id ? updatedSmallTrip : st
                    ),
                }));
                
                setSnackbar({
                    open: true,
                    message: 'Sub-trip updated successfully',
                    severity: 'success'
                });
            } else {
                // Create new SmallTrip using official API service
                console.log("Creating new small trip for TripID:", trip.id);
                const newSmallTrip = await tripService.createSmallTrip(trip.id, submitData, accessToken);
                console.log("Create response:", newSmallTrip);

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: [...(prev.smallTrips || []), newSmallTrip],
                }));
                
                setSnackbar({
                    open: true,
                    message: 'Sub-trip created successfully',
                    severity: 'success'
                });
            }

            setDialogOpen(false);
        } catch (err) {
            console.error("Operation failed:", err);
            console.error("Error details:", err.message, err.stack);
            
            // Provide different error messages based on error type
            let errorMessage = 'Operation failed';
            if (err.message.includes('401')) {
                errorMessage = 'Authentication failed, please login again';
            } else if (err.message.includes('403')) {
                errorMessage = 'You do not have permission to perform this action';
            } else if (err.message.includes('404')) {
                errorMessage = 'Resource not found';
            } else if (err.message.includes('400')) {
                errorMessage = 'Invalid request data, please check your input';
            } else if (err.message.includes('Network')) {
                errorMessage = 'Network error, please check your connection';
            } else {
                errorMessage = `Operation failed: ${err.message || 'Please try again'}`;
            }
            
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // 处理编辑大行程按钮点击
    const handleEditMainTrip = () => {
        if (trip) {
            setMainTripFormData({
                name: trip.name,
                description: trip.description || ''
            });
            setMainTripDialogOpen(true);
        }
    };
    
    // 提交大行程修改
    const handleSubmitMainTrip = async () => {
        if (!trip || !accessToken || !isAuthenticated) {
            setSnackbar({
                open: true,
                message: 'Cannot complete operation, please ensure you are logged in',
                severity: 'error'
            });
            return;
        }
        
        if (!mainTripFormData.name) {
            setSnackbar({
                open: true,
                message: 'Name cannot be empty',
                severity: 'error'
            });
            return;
        }
        
        setSubmitting(true);
        try {
            console.log("Updating Trip, ID:", trip.id);
            
            // Prepare submit data
            const submitData = {
                name: mainTripFormData.name,
                description: mainTripFormData.description || '' // Ensure description is not undefined
            };
            console.log("Trip submit data:", submitData);

            // Call update trip API
            const updatedTrip = await tripService.updateTrip(trip.id, submitData, accessToken);
            console.log("Update trip response:", updatedTrip);

            // Update trip data on page
            setTrip((prev) => ({
                ...prev,
                name: updatedTrip.name,
                description: updatedTrip.description,
                lastUpdatedAt: updatedTrip.lastUpdatedAt
            }));
            
            setSnackbar({
                open: true,
                message: 'Trip updated successfully',
                severity: 'success'
            });
            
            setMainTripDialogOpen(false);
        } catch (err) {
            console.error("Operation failed:", err);
            console.error("Error details:", err.message, err.stack);
            
            // Provide different error messages based on error type
            let errorMessage = 'Operation failed';
            if (err.message.includes('401')) {
                errorMessage = 'Authentication failed, please login again';
            } else if (err.message.includes('403')) {
                errorMessage = 'You do not have permission to perform this action';
            } else if (err.message.includes('404')) {
                errorMessage = 'Resource not found';
            } else if (err.message.includes('400')) {
                errorMessage = 'Invalid request data, please check your input';
            } else if (err.message.includes('Network')) {
                errorMessage = 'Network error, please check your connection';
            } else {
                errorMessage = `Operation failed: ${err.message || 'Please try again'}`;
            }
            
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
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
                    <Typography variant="h5">Please login to view trip details</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please click the "Login" button in the top right corner
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth={false} disableGutters>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    pt: 4,
                    transition: "all 0.5s ease",
                }}
            >
                <Typography
                    color="primary"
                    variant="h2"
                    sx={{
                        mb: 2,
                        fontFamily: "inherit",
                        fontWeight: "bold",
                        fontSize: "48px",
                        textAlign: "center",
                    }}
                >
                    TRIP DETAILS
                </Typography>
                
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 800,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mb: 4,
                    }}
                >
                    {/* Main Trip Info */}
                    <Box>
                        {loading ? (
                            <>
                                <Skeleton variant="text" height={60} />
                                <Skeleton variant="text" height={30} width="50%" />
                                <Skeleton variant="text" height={80} />
                            </>
                        ) : trip ? (
                            <Card 
                                elevation={3} 
                                sx={{ 
                                    p: 0, 
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: "box-shadow 0.2s ease-in-out",
                                    ":hover": {
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Typography 
                                            variant="h4" 
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#2e7d32",
                                                mb: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2, 
                                                pt: 1,
                                                flexWrap: "wrap",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            <ImageThumb size="large" shape="circle" /> {trip.name}
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={handleEditMainTrip}
                                            sx={{ 
                                                borderRadius: 2,
                                                mt: 2
                                            }}
                                        >
                                            Edit Trip
                                        </Button>
                                    </Box>
                                    <Typography color="text.secondary" gutterBottom>
                                        <PersonIcon fontSize="small" /> Created: {new Date(trip.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        <AccessTimeIcon fontSize="small" /> Updated: {new Date(trip.lastUpdatedAt).toLocaleString()}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color="primary"
                                        sx={{ 
                                            mt: 2,
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {trip.description}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
                                        <Chip label={`Created by: ${trip.createdBy}`} size="small" color="primary" />
                                    </Box>
                                </CardContent>
                            </Card>
                        ) : (
                            <Alert severity="warning">No trip data available</Alert>
                        )}
                    </Box>

                    {/* Sub-trips Section */}
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography 
                                variant="h5" 
                                sx={{
                                    fontWeight: "bold",
                                    color: "#1e293b",
                                }}
                            >
                                Sub-trips
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={handleAdd}
                                disabled={!trip}
                                sx={{ borderRadius: 2 }}
                            >
                                Add New Sub-trip
                            </Button>
                        </Box>

                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <Skeleton key={i} variant="rounded" height={100} sx={{ mb: 2 }} />
                            ))
                        ) : trip?.smallTrips && trip.smallTrips.length > 0 ? (
                            <Stack spacing={2}>
                                {trip.smallTrips.map((subTrip) => (
                                    <Card
                                        key={subTrip.id}
                                        elevation={2}
                                        sx={{
                                            cursor: "pointer",
                                            p: 0,
                                            borderRadius: 2,
                                            boxShadow: 2,
                                            transition: "box-shadow 0.2s ease-in-out",
                                            ":hover": {
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Box sx={{ flexGrow: 1, pr: 2 }}>
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "#2e7d32",
                                                        mb: 0.5,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 2,
                                                        flexWrap: "wrap",
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    <ImageThumb size="small" shape="rounded" /> {subTrip.name}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="primary"
                                                    sx={{
                                                        fontSize: "1rem",
                                                        maxWidth: "100%",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        ml: 7,
                                                    }}
                                                >
                                                    {subTrip.description}
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleEdit(subTrip)}
                                                sx={{ 
                                                    borderRadius: 5,
                                                    flexShrink: 0
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body1" textAlign="center" sx={{ py: 4 }}>
                                No sub-trips available
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Sub-trip Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{isEditing ? "Edit Sub-trip" : "Add New Sub-trip"}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="dense"
                        required
                        autoFocus
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} disabled={submitting}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary"
                        disabled={submitting || !formData.name}
                    >
                        {submitting ? "Processing..." : isEditing ? "Save" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Main Trip Edit Dialog */}
            <Dialog
                open={mainTripDialogOpen}
                onClose={() => setMainTripDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Trip</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Name"
                        fullWidth
                        value={mainTripFormData.name}
                        onChange={(e) => setMainTripFormData({ ...mainTripFormData, name: e.target.value })}
                        margin="dense"
                        required
                        autoFocus
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={mainTripFormData.description}
                        onChange={(e) => setMainTripFormData({ ...mainTripFormData, description: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMainTripDialogOpen(false)} disabled={submitting}>Cancel</Button>
                    <Button 
                        onClick={handleSubmitMainTrip} 
                        variant="contained" 
                        color="primary"
                        disabled={submitting || !mainTripFormData.name}
                    >
                        {submitting ? "Processing..." : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Operation result notification */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TripDetails;

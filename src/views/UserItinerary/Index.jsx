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
  TextField,
  Alert,
  Grid2 as Grid,
  Card,
  CardContent,
} from "@mui/material";
import tripService from "../../services/trip.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { getGlobalData } from "../../global.js";
// Import ImageThumb component
import ImageThumb from "../../components/ImageThumb/index.jsx";
// Keep original icons for reference
import ListAltIcon from "@mui/icons-material/ListAlt";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const UserItinerary = () => {
  const { isAuthenticated } = useAuth0();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState();
  const [accessToken, setAccessToken] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  // form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalData(getGlobalData());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const setLastTripPublic = async () => {
        await tripService.setTripIsPublic(id, true, accessToken);
    }

    setLoading(false);
    if (itineraries.length > 0) {
        var id = itineraries[itineraries.length - 1].id;
        setLastTripPublic();
    }
  }, [itineraries]);

  useEffect(() => {
    const getMyTrips = async () => {
      setItineraries(await tripService.getMyTrips(globalData.accessToken));
    };
    if (globalData) {
      setAccessToken(globalData.accessToken);
      getMyTrips();
    }
  }, [globalData, loading]);

  //   useEffect(() => {
  //     try {
  //       // if (!isAuthenticated) {
  //       //     console.log("User not logged in, unable to load trips");
  //       //     setLoading(false);
  //       //     return;
  //       // }
  //       const getTripsOwn = async () => {
  //         setItineraries(
  //           await tripService.getMyTrips(getGlobalData("accessToken"))
  //         );
  //       };

  //       const token = getGlobalData("accessToken");
  //       console.log(token);
  //       if (token !== undefined) {
  //         setAccessToken(token);
  //         getTripsOwn();
  //         setError(null);
  //       }
  //     } catch (err) {
  //       console.error("Failed to get trips:", err);
  //       setError(`Failed to get trips: ${err.message || "Unknown error"}`);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   }, [getGlobalData("accessToken"), loading]);

  const handleNameChange = (e) => {
    setName(e.target.value ?? null);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleClickCreate = () => {
    setOpenCreateDialog(true);
  }

  const handleCreateConfirm = async () => {
    await tripService.createTrip({name: name, description: description}, accessToken);
    setOpenCreateDialog(false);
    setLoading(true);
    setName('');
    setDescription('');
  }

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await tripService.setTripIsHidden(selectedId, true, accessToken);
      setLoading(true);
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to delete trip:", err);
      setError(`Failed to delete trip: ${err.message || "Unknown error"}`);
      setOpenDialog(false);
    }
  };

  if (error) {
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
                {/* Page title */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 4,
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <ImageThumb size="large" shape="circle" />
                    <Typography
                        color="primary"
                        variant="h2"
                        sx={{
                            fontFamily: "inherit",
                            fontWeight: "bold",
                            fontSize: "48px",
                            lineHeight: 1.2,
                        }}
                    >
                        MY ITINERARIES
                    </Typography>
                </Box>

                {/* Itinerary list container */}
                <Box
                    sx={{
                        width: "85%",
                        maxWidth: 950,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mb: 4,
                        maxHeight: "700px",
                        overflowY: "auto",
                    }}
                >
                    {loading ? (
                        <Box display="flex" justifyContent="center" sx={{ py: 3 }}>
                            <CircularProgress size={50} />
                        </Box>
                    ) : itineraries.length === 0 ? (
                        <Typography variant="body1" textAlign="center" sx={{ py: 4 }}>
                            You haven't created any itineraries yet
                        </Typography>
                    ) : (
                        itineraries.map((itinerary) => (
                            <Card
                                key={itinerary.id}
                                elevation={2}
                                sx={{
                                    width: "100%",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    overflow: "visible",
                                    mb: 1,
                                }}
                            >
                                <CardContent 
                                    sx={{ 
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 2,
                                        px: 3,
                                        "&:last-child": {
                                            pb: 2,
                                        }
                                    }}
                                >
                                    {/* Title area */}
                                    <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: 2
                                    }}>
                                        <Box 
                                            sx={{ 
                                                width: 44,
                                                height: 44,
                                                flexShrink: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                "& > *": {
                                                    width: "44px !important",
                                                    height: "44px !important",
                                                    minWidth: "44px !important",
                                                    minHeight: "44px !important",
                                                    maxWidth: "44px !important",
                                                    maxHeight: "44px !important",
                                                }
                                            }}
                                        >
                                            <ImageThumb 
                                                size="small" 
                                                shape="rounded" 
                                            />
                                        </Box>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ 
                                                fontWeight: "bold",
                                                color: "#2e7d32",
                                                maxWidth: {xs: "150px", sm: "200px", md: "250px"},
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {itinerary.name}
                                        </Typography>
                                    </Box>
                                    
                                    {/* Buttons - smaller size */}
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate(`/trips/${itinerary.id}`)}
                                            sx={{ 
                                                borderRadius: 2,
                                                minWidth: "70px",
                                                height: "32px",
                                                fontSize: "0.75rem"
                                            }}
                                            startIcon={<VisibilityIcon sx={{ fontSize: "1rem" }} />}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteClick(itinerary.id)}
                                            sx={{ 
                                                borderRadius: 2,
                                                minWidth: "70px",
                                                height: "32px",
                                                fontSize: "0.75rem"
                                            }}
                                            startIcon={<DeleteIcon sx={{ fontSize: "1rem" }} />}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
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
  }

  // Show login prompt when not authenticated
  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5">
            Please login to view your itineraries
          </Typography>
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

      <Grid my={1} mx={0} width="90%" display="flex" justifyContent="right">
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleClickCreate}>
          Create
        </Button>
      </Grid>

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
                  onClick={() => navigate(`/trips/${itinerary.id}`)}
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
      {/* delete */}
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
      {/* create */}
      <Dialog open={openCreateDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Trip</DialogTitle>
        <DialogContent dividers>
                            <TextField
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={handleNameChange}
                                margin="dense"
                                required
                                autoFocus
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={description}
                                onChange={handleDescriptionChange}
                                margin="dense"
                            />
                        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateConfirm} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserItinerary;

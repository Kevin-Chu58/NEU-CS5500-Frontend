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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.css";

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    // 表单弹窗控制
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '' });

    useEffect(() => {
        // 模拟获取 trip 数据
        const mockData = {
            id: 1,
            name: "European Summer Adventure",
            description: "A grand 3-week summer trip across Europe, covering iconic cities and scenic routes.",
            createdBy: 101,
            createdAt: "2023-06-10T09:00:00Z",
            lastUpdatedAt: "2024-12-25T18:00:00Z",
            smallTrips: [
                {
                    id: 201,
                    name: "Paris City Walk",
                    description: "Discovering the Eiffel Tower, Louvre, and Seine River.",
                    tripId: 1,
                },
                {
                    id: 202,
                    name: "Swiss Alps Hiking",
                    description: "A 2-day adventure in the Swiss mountains with breathtaking views.",
                    tripId: 1,
                },
                {
                    id: 203,
                    name: "Venice Canal Tour",
                    description: "Romantic boat ride through Venice's waterways.",
                    tripId: 1,
                },
            ],
        };

        setTimeout(() => {
            setTrip(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAdd = () => {
        setFormData({ id: null, name: '', description: '' });
        setIsEditing(false);
        setDialogOpen(true);
    };

    const handleEdit = (subTrip) => {
        setFormData({ id: subTrip.id, name: subTrip.name, description: subTrip.description });
        setIsEditing(true);
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (!trip) return;

            if (isEditing) {
                await axios.patch(`/smallTrips/${formData.id}`, {
                    id: formData.id,
                    name: formData.name,
                    description: formData.description,
                    tripId: trip.id,
                });

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: prev.smallTrips.map((st) =>
                        st.id === formData.id ? { ...st, ...formData } : st
                    ),
                }));
            } else {
                const res = await axios.post(`/smallTrips/${trip.id}`, {
                    name: formData.name,
                    description: formData.description,
                    tripId: trip.id,
                });

                setTrip((prev) => ({
                    ...prev,
                    smallTrips: [...prev.smallTrips, res.data],
                }));
            }

            setDialogOpen(false);
        } catch (err) {
            console.error("Submit failed:", err);
            alert("Operation failed. Please try again.");
        }
    };

    return (
        <Container maxWidth="xl" className="trip-container">
            <Stack direction="row" spacing={4} alignItems="flex-start">
                {/* Left: Main Trip Info */}
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" height={40} />
                                    <Skeleton variant="text" height={20} width="50%" />
                                </>
                            ) : (
                                <div className="main-info-card">
                                    <Typography className="trip-title">{trip.name}</Typography>
                                    <Typography sx={{ color: "gray" }}>
                                        Last updated: {new Date(trip.lastUpdatedAt).toLocaleString()}
                                    </Typography>
                                    <Typography className="trip-description">{trip.description}</Typography>
                                </div>
                            )}
                        </Grid>

                        <Grid size={12}>
                            <Typography className="subtrip-section-title">Sub-trips</Typography>
                        </Grid>

                        <Grid size={12}>
                            <Button variant="contained" color="primary" onClick={handleAdd}>
                                Add New Sub-trip
                            </Button>
                        </Grid>

                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <Grid key={i} size={12}>
                                    <Skeleton variant="rounded" height={60} />
                                </Grid>
                            ))
                        ) : trip.smallTrips.length > 0 ? (
                            trip.smallTrips.map((subTrip) => (
                                <Grid key={subTrip.id} size={12}>
                                    <div className="subtrip-card">
                                        <Typography className="subtrip-title">{subTrip.name}</Typography>
                                        <Typography className="subtrip-description">{subTrip.description}</Typography>
                                        <Button size="small" onClick={() => handleEdit(subTrip)}>
                                            Edit
                                        </Button>
                                    </div>
                                </Grid>
                            ))
                        ) : (
                            <Grid size={12}>
                                <Typography variant="body2" color="text.secondary">
                                    No sub-trips available.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Container>

                {/* Right: Meta Info Panel */}
                <div className="meta-panel">
                    <Typography variant="subtitle1">Meta Info</Typography>
                    {loading ? (
                        <Skeleton height={40} />
                    ) : (
                        <>
                            <Chip className="meta-chip" label={`Created by: ${trip.createdBy}`} />
                            <Typography variant="body2">
                                Created: {new Date(trip.createdAt).toLocaleString()}
                            </Typography>
                        </>
                    )}
                </div>
            </Stack>

            {/* Sub-trip Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{isEditing ? "Edit Sub-trip" : "Add New Sub-trip"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="dense"
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
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {isEditing ? "Save" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TripDetails;

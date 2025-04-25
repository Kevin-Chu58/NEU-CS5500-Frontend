import {
    Container,
    Typography,
    Grid2 as Grid,
    Skeleton,
    Stack,
    Rating,
    Chip,
    Box,
    Card,
    CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
// 添加Material-UI图标
import MapIcon from "@mui/icons-material/Map";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

const Itinerary = () => {
    const { id } = useParams();

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
                    <MapIcon fontSize="large" /> ITINERARY DETAILS
                </Typography>
                
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 1000,
                        mb: 4,
                    }}
                >
                    <Card
                        elevation={3}
                        sx={{
                            p: 0,
                            borderRadius: 2,
                            boxShadow: 2,
                            mb: 3,
                            transition: "box-shadow 0.2s ease-in-out",
                            ":hover": {
                                boxShadow: 6,
                            },
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#2e7d32",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        Itinerary Title
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            color: "text.secondary",
                                        }}
                                    >
                                        <AccessTimeIcon fontSize="small" /> Last edited: Jan 20, 2023
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <StarIcon color="primary" fontSize="small" />
                                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Chip
                                        label="seattle"
                                        size="small"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                    />
                                </Grid>
                                <Grid xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Content Preview
                                    </Typography>
                                    <Skeleton variant="rounded" height={20} sx={{ mt: 1 }} />
                                    <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
                                    <Skeleton variant="rounded" height={20} sx={{ mt: 2 }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

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
                            <Grid container spacing={2}>
                                <Grid xs={12}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#2e7d32",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <PersonIcon /> Author Profile
                                    </Typography>
                                    <Skeleton variant="rounded" height={60} />
                                </Grid>
                                <Grid xs={12} sx={{ mt: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#2e7d32",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        Navigation
                                    </Typography>
                                    <Skeleton variant="rounded" height={100} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

export default Itinerary;

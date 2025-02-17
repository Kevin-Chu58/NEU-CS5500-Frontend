import {
    Container,
    Typography,
    Grid2 as Grid,
    Skeleton,
    Stack,
    Button,
    Rating,
    Chip,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
    return (
        <Container maxWidth="xl" sx={{mt: 4}}>
            {/* <Stack direction="row" spacing={2} sx={{m: 1, width: "100%"}}>
                <Button
                    variant="outlined"
                    size="small"
                    color="neutral"
                    startIcon={<DownloadIcon fontSize="inherit" />}
                >
                    Download
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    color="neutral"
                    startIcon={<PrintIcon fontSize="inherit" />}
                >
                    Print
                </Button>
            </Stack> */}
            
            <Stack direction="row">
                <Container maxWidth="md">
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            m: 1,
                        }}
                    >
                        <Grid spacing={0}>
                            <Grid size={12} margin={0}>
                                <Typography variant="h4">Title</Typography>
                                
                <Typography sx={{ ml: "auto" }}>Last edited: Jan 20, 2023</Typography>
                                
                            </Grid>
                            <Grid size={12}>
                                <Rating name="half-rating"  defaultValue={2.5} precision={0.5} />
                            </Grid>
                            <Grid size={12}>
                                <Chip label="seattle" size="small" color="primary" />
                            </Grid>
                        </Grid>
                        
                         {/* content */}
                        <Grid size={12}>
                            <Skeleton variant="rounded" height={20}></Skeleton>
                        </Grid>
                        <Grid size={12}>
                            <Skeleton variant="rounded" height={100}></Skeleton>
                        </Grid>
                        <Grid size={12}>
                            <Skeleton variant="rounded" height={20}></Skeleton>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="xs">
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            m: 1,
                        }}
                    >
                        <Grid size={12} spacing={0}>
                            <Grid size={12}>
                                Author profile widget (TODO BELOW):
                                <Skeleton variant="rounded" height={60}/>
                            </Grid>
                        </Grid>

                        {/* content */}
                        <Grid size={12}>
                            Nav list (TODO BELOW):
                            <Skeleton variant="rounded" height={100} />
                        </Grid>
                    </Grid>
                </Container>
            </Stack>
        </Container>
    );
};

export default Home;

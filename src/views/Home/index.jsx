import {
    Container,
    Typography,
    Skeleton
} from "@mui/material";
import PlannerSearch from "../../components/PlannerSearch/index.tsx";

const Home = () => {

    return (
        <Container
            maxWidth={false}
            sx={{ mt: 4, justifyItems: "center", fontFamily: "cursive" }}
        >
            <Typography
                color="primary"
                variant="h4"
                sx={{
                    my: 1,
                    fontFamily: "inherit",
                    fontWeight: "bold",
                    cursor: "default",
                }}
            >
                TAKE ME TO
            </Typography>
            <PlannerSearch />

            <Skeleton width={800} height={1000} />
        </Container>
    );
};

export default Home;

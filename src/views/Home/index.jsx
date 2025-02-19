import {
    Container,
    Typography,
    Grid2 as Grid,
    Stack,
    Button,
    Input,
    Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import Accordion from "../../components/Accordion/index.tsx";
import AccordionSummary from "../../components/AccordionSummary/index.tsx";
import AccordionDetails from "../../components/AccordionDetails/index.tsx";

const Home = () => {
    const [where, setWhere] = useState("");

    useEffect(() => {}, [where]);

    const handleInputChange = (e) => {
        setWhere(e.target.value);
    };

    const isInputEmpty = () => {
        return where.length === 0;
    };

    const handleSearch = () => {
        console.log(where);
        setWhere("");
    };

    return (
        <Container
            maxWidth="xl"
            sx={{ mt: 4, justifyItems: "center", fontFamily: "cursive" }}
        >
            <Typography
                color="primary"
                variant="h4"
                sx={{ my: 1, fontFamily: "inherit", fontWeight: "bold" }}
            >
                TAKE ME TO
            </Typography>
            <Stack direction="row">
                <Input
                    id="where"
                    size="small"
                    sx={{
                        width: 400,
                        borderRadius: 2,
                        pt: 1,
                        pl: 1,
                        m: 0,
                        fontSize: 18,
                        fontFamily: "inherit",
                        backgroundColor: "#dddddd",
                    }}
                    disableUnderline
                    placeholder="Where?"
                    onChange={handleInputChange}
                    value={where}
                />
                <Button
                    disabled={isInputEmpty()}
                    variant="contained"
                    size="small"
                    sx={{
                        minWidth: 40,
                        height: 40,
                        my: "auto",
                        ml: 2,
                        fontFamily: "inherit",
                    }}
                    onClick={handleSearch}
                >
                    <Typography variant="h6" sx={{ fontFamily: "inherit" }}>
                        Go!
                    </Typography>
                </Button>
            </Stack>

            {/* filter */}
            <Accordion>
                <AccordionSummary>
                    <span>summary</span>
                </AccordionSummary>
                <AccordionDetails>
                    <Skeleton width={100} />
                </AccordionDetails>
            </Accordion>

            <Typography>a</Typography>
        </Container>
    );
};

export default Home;

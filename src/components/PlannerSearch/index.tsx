import { useState, useEffect } from "react";
import {
    Stack,
    Input,
    Button,
    Typography,
    Container,
    AppBar,
    Divider,
    Chip,
} from "@mui/material";
import Accordion from "../Accordion/index.tsx";
import AccordionDetails from "../AccordionDetails/index.tsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import React from "react";
import PlannerFilter from "./PlannerFilter/index.tsx";
import { blue, cyan, grey, indigo, red } from "@mui/material/colors";

const PlannerSearch = () => {
    const [where, setWhere] = useState("");
    const [filterShown, setFilterShown] = useState(false);
    const [searchBarTop, setSearchBarTop] = useState(0);
    const [searchBarWidth, setSearchBarWidth] = useState(0);

    useEffect(() => {}, [where]);
    useEffect(() => initSearchBar());

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

    const initSearchBar = () => {
        const appBar = document.getElementById("app-bar") as HTMLElement;
        setSearchBarTop(appBar.scrollHeight);
        setSearchBarWidth(appBar.clientWidth);
    };

    return (
        <Container
            maxWidth={false}
            sx={{ zIndex: 10, background: "white", justifyItems: "center" }}
        >
            <AppBar
                id="search-bar"
                position="sticky"
                sx={{
                    width: searchBarWidth,
                    top: searchBarTop,
                    zIndex: 20,
                    boxShadow: filterShown ? "2px 2px 2px rgba(0, 0, 0, 0.1), 4px 4px 4px rgba(0, 0, 0, 0.1)" : "none",
                    background: "white",
                    justifyContent: "center",
                }}
            >
                <Stack
                    direction="row"
                    sx={{ my: 1, position: "relative", mx: "auto" }}
                >
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
                        autoFocus={true}
                    />
                    <Button
                        disabled={isInputEmpty()}
                        variant="contained"
                        size="small"
                        sx={{
                            minWidth: 40,
                            height: 40,
                            my: "auto",
                            mx: 2,
                            fontFamily: "inherit",
                        }}
                        onClick={handleSearch}
                    >
                        <Typography variant="h6" sx={{ fontFamily: "inherit" }}>
                            Go!
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => setFilterShown((b) => !b)}
                        variant="contained"
                        sx={{ minWidth: 0 }}
                    >
                        {filterShown ? <FilterAltOffIcon /> : <FilterAltIcon />}
                    </Button>
                </Stack>

                {/* TODO - make it asyc with filter selection */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        fontFamily: "inherit",
                        display: "relative",
                        justifyContent: "center",
                        m: 1,
                    }}
                >
                    <Chip
                        label="$$"
                        size="small"
                        sx={{ background: grey[600], color: grey[100], fontFamily: "inherit" }}
                    />
                    <Chip
                        label="hotel"
                        size="small"
                        sx={{ background: blue[600], color: blue[100], fontFamily: "inherit" }}
                    />
                    <Chip
                        label="1-3D"
                        size="small"
                        sx={{ background: indigo[600], color: indigo[100], fontFamily: "inherit" }}
                    />
                    <Chip
                        label="culture"
                        size="small"
                        sx={{ background: red[600], color: red[100], fontFamily: "inherit" }}
                    />
                    <Chip
                        label="hot"
                        size="small"
                        sx={{ background: cyan[600], color: cyan[100], fontFamily: "inherit" }}
                    />
                    <Chip
                        label="this is demo"
                        size="small"
                        sx={{ background: grey[600], color: grey[100], fontFamily: "inherit" }}
                    />
                </Stack>
                <Divider/>
            </AppBar>

            <Accordion
                identifier="filter1"
                sx={{ transition: "all .3s ease-in" }}
                isExpanded={filterShown}
                setIsExpanded={setFilterShown}
            >
                <AccordionDetails display="flex">
                    {/* filter content */}
                    <PlannerFilter />
                    {/* <span className="ref" style={{ margin: "auto" }}>
                            close
                        </span> */}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default PlannerSearch;

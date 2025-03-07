import { Paper } from "@mui/material";
import React from "react";

const AccordionDetails = ({ display, children }) => {
    return (
        <Paper
            className="accordion-details"
            elevation={0}
            sx={{
                borderRadius: 0,
                zIndex: 10,
                position: "relative",
                display: display,
            }}
        >
            {children}
        </Paper>
    );
};

export default AccordionDetails;

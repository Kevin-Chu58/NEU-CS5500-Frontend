import { Paper } from "@mui/material";
import React from "react";

const AccordionDetails = ({children}) => {
    return (
        <Paper className="accordion-details" elevation={0} sx={{borderRadius: 0}}>
            {children}
        </Paper>
    )
};

export default AccordionDetails;
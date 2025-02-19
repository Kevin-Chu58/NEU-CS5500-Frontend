import { Paper } from "@mui/material";
import React from "react";

const AccordionSummary = ({children}) => {
    return (
        <Paper className="accordion-summary" elevation={0} sx={{borderRadius: 0}}>
            {children}
        </Paper>
    )
};

export default AccordionSummary;
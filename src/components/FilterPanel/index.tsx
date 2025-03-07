import { Grid2 as Grid, Icon, Typography } from "@mui/material";
import React from "react";

const FilterPanel = ({ title, icon, color, children }) => {
    return (
        <>
            <Grid container size={3}>
                <Typography variant="h5" m="auto" fontFamily="inherit" color={color}>
                    {title}
                    <Icon sx={{ml: 1, mb: -.5}}>
                        {icon}
                    </Icon>
                </Typography>
            </Grid>
            <Grid container size={9} p={1} pl={4} borderLeft="1px solid grey">
                {children}
            </Grid>
        </>
    );
};

export default FilterPanel;

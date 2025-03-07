import React from "react";
import { Button, Typography, Grid2 as Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

const FilterButton = ({
    icon,
    label,
    isSelected,
    setIsSelected,
    background,
    color,
}) => {
    const defaultColor = grey[400];
    const defaultBackground = grey[200];

    return (
        <Grid
            size={2}
            sx={{
                display: "grid",
                cursor: "pointer",
                my: "2px",
                justifyContent: "center",
                alignItems: "flex-start",
                ":hover": {
                    filter: "brightness(90%)",
                },
                transition: "none",
            }}
            onClick={() => setIsSelected((b: any) => !b)}
        >
            <Button
                aria-label={label}
                sx={{
                    borderRadius: "6px",
                    border: `2px ${
                        isSelected ? background : defaultColor
                    } solid`,
                    px: 1,
                    py: 0,
                    mx: "auto",
                    my: 0,
                    minWidth: 32,
                    height: 32,
                    fontWeight: "bold",
                    fontSize: 16,
                    color: isSelected ? color : defaultColor,
                    background: isSelected ? background : defaultBackground,
                }}
            >
                {icon}
            </Button>
            <Typography
                sx={{
                    fontFamily: "inherit",
                    textAlign: "center",
                    color: isSelected ? background : defaultColor,
                    mx: "auto",
                }}
            >
                {label}
            </Typography>
        </Grid>
    );
};

export default FilterButton;

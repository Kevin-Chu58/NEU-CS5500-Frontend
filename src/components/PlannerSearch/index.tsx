import { useState } from "react";
import {
  Stack,
  Input,
  Button,
  Typography,
  Container,
  AppBar,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import React from "react";

const PlannerSearch = ({ onSearch }) => {
  const [where, setWhere] = useState("");
  const [filterShown, setFilterShown] = useState(false);
  const theme = useTheme();

  const handleInputChange = (e) => {
    setWhere(e.target.value);
  };

  const isInputEmpty = () => {
    return where.trim().length === 0;
  };

  const handleSearch = () => {
    if (!isInputEmpty()) {
      onSearch(where.trim());
      setWhere("");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        id="search-bar"
        position="static"
        sx={{
          px: 3,
          py: 2,
          background: "white",
          boxShadow: theme.shadows[4],
          borderRadius: 2,
          width: "fit-content",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Input
            id="where"
            size="small"
            sx={{
              width: 600,
              borderRadius: 2,
              pl: 1,
              fontSize: 18,
              fontFamily: "inherit",
              backgroundColor: "#eeeeee",
            }}
            disableUnderline
            placeholder="Where?"
            onChange={handleInputChange}
            value={where}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            disabled={isInputEmpty()}
            variant="contained"
            size="small"
            onClick={handleSearch}
            sx={{ fontFamily: "inherit", height: 40 }}
          >
            <Typography variant="h6">Go!</Typography>
          </Button>
          <Button
            onClick={() => setFilterShown((b) => !b)}
            variant="outlined"
            sx={{ minWidth: 0 }}
          >
            {filterShown ? <FilterAltOffIcon /> : <FilterAltIcon />}
          </Button>
        </Stack>
      </AppBar>
    </Container>
  );
};

export default PlannerSearch;

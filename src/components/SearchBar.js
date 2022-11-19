import { TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ username, setUserName }) => {
  const [name, setName] = useState("");
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        border: "1px solid black",
        height: "100%",
        borderRadius: "6px",
        padding: "8px",
        columnGap: "4px",
      }}
    >
      <TextField
        placeholder="Enter Github Username"
        size="small"
        onChange={(e) => setName(e.target.value)}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
      />
      <SearchIcon
        onClick={() => {
          setUserName(name);
        }}
      />
    </div>
  );
};

export default SearchBar;

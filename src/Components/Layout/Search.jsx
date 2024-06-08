import {
  Box,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ItemsDes, MainTitle } from "../../Style/StyledComponents/Typography";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 5, 2, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchSocket = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "wss://easytradyapi.shop/ws/shop/search/",
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN && search) {
      sendJsonMessage({
        query: search,
      });
    }
  }, [readyState, search, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      // try {
      //   const results = JSON.parse(lastJsonMessage.data);
        setSearchResults(lastJsonMessage?.data);
      // } catch (error) {
      //   console.error("Failed to parse JSON:", error);
      //   setSearchResults({});
       }
    // }
  }, [lastJsonMessage]);
  

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setOpenMenu(!!value);
  };
console.log(searchResults);
  return (
    <Stack>
      <Search sx={{ mr: { xs: 3 }, color: theme.palette.primary.dark }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("Search…")}
          value={search}
          onChange={handleSearchChange}
          sx={{
            border: "1px solid #e7eaf3",
            borderRadius: "8px",
            fontFamily: "Cairo",
            fontSize: "14px",
          }}
        />
      </Search>
      {openMenu && (
        <Paper
          sx={{
            position: "absolute",
            zIndex: 1,
            top: '65px',
            mx: 2,
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            border: "1px solid #e7eaf3",
            borderRadius: "8px",
            // fontFamily: "Cairo",
            // fontSize: "14px",
            maxHeight: "200px",
            overflowY: "auto",
            width: "300px",
          }}
        >
          <MenuList>
          {Object.entries(searchResults).map(([title, items]) => (
              items?.length > 0 && (
                <React.Fragment key={title} >
                  <Box mb={3}>
                  <MainTitle p={3}>{title}</MainTitle>
                  {items.map((item) => (
                    <ItemsDes
                      sx={{
                        borderBottom: "1px solid #e7eaf3",
                        padding: "10px 16px",
                        
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                          color: theme.palette.primary.light,
                        },
                      }}
                      key={item?.id}
                    >
                      {item?.name}
                    </ItemsDes>
                  ))}
                  </Box>
                </React.Fragment>
              )
            ))}
          </MenuList>
        </Paper>
      )}
    </Stack>
  );
};

export default SearchSocket;
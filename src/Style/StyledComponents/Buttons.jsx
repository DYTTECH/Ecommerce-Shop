const { styled, Button } = require("@mui/material");

export const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.light
}));
export const DarkButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.light,
    bgcolor: theme.palette.primary.dark,

}));
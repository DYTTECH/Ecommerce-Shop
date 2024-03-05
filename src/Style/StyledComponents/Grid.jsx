const { styled, Grid } = require("@mui/material");

export const FooterGridDisplay = styled(Grid)(({ theme }) => ({
    display: { lg: "block", md: "block", sm: "block", xs: "none" },
}));

export const GridCenter = styled(Grid)(({ theme }) => ({
    display: "flex", justifyContent: "center"
}));

export const FooterGridCenter = styled(Grid)(({ theme }) => ({
    display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
}));

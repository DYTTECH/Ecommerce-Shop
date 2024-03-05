const { styled, Box } = require("@mui/material");

export const BoxStyle = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
}));

export const BoxMenuSkew = styled(Box)(({ theme }) => ({
    
    transform: 'skewX(10deg)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '0'
}));
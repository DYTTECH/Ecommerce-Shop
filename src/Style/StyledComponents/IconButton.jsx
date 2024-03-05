const { styled, IconButton } = require("@mui/material");

export const GrayIcon = styled(IconButton)(({ theme }) => ({
    color:theme.palette.primary.third,width: 56, height: 56
}));
export const FooterGrayIcon = styled(IconButton)(({ theme }) => ({
    color:theme.palette.primary.third,width: 40, height: 40, marginLeft:'8px'
}));
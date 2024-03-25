import { OutlinedInput, Select, styled } from "@mui/material";

export  const DropDown=styled(Select)(({ theme }) => ({
    
}))

export  const InputPrice=styled(OutlinedInput)(({ theme }) => ({
    
    width: '50%',
    height: '36px',
    borderRadius: '20px',
    border: '2px solid #E5E7EB',
    display:'flex',
    alignItems:"center",
    padding: "0px, 24px, 0px, 24px",
    fontFamily: 'Cairo',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '0em',
  textAlign: 'left',
  root: {
    ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px white inset',
        backgroundColor: 'red !important'
    }
  },
  input: {
    ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px white inset',
        backgroundColor: 'red !important'
    },},
}))

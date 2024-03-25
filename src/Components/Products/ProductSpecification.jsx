import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const Specification = () => {
    const ProductDetails = useSelector((state) => state.productdetails.value);
      useEffect(()=>{

      },[ProductDetails])
  return (
    <Box sx={{width:{md:'100%',xs:'100%'}}} >
         { 
         ProductDetails.specifications&&
         ProductDetails?.specifications?.length? 
         <List
         sx={{
           width: "100%",
           maxWidth: 360,
           bgcolor: "background.paper",
         }}
       >
         {ProductDetails?.specifications?.map((Attribute) => (
           <ListItem
             key={Attribute}
             disableGutters
             sx={{ paddingTop: "0", paddingBottom: "0" }}
             secondaryAction={
               <IconButton aria-label="comment">
                 <FiberManualRecordIcon sx={{ p: 1 }} />
               </IconButton>
             }
           >
             <ListItemText
               // eslint-disable-next-line no-useless-concat
               primary={`${Attribute?.key}`+" : " + `${Attribute?.value}`}
               sx={{ textAlign: "right", fontFamily: "Cairo" }}
             />
           </ListItem>
         ))}
       </List>
     :
    <Box>The product don't have specifications</Box>
    } 
    </Box>
  )
}

export default Specification
import { Box, useScrollTrigger } from "@mui/material";
import ProductSlider from "../Products/ProductSlider";


const RecommendedForYou = ({sort_id,title}) => {
  
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
      });
    return (
        <Box sx={{ flexGrow: 1, transition: "0.8s all",
        paddingInline: "2%",
        paddingBottom: trigger ? "5%" : "8%",

        paddingTop: trigger ? "1%" : "2%",
         }}>
        <ProductSlider title={title} keyId={sort_id}/>
      </Box>
    );
  };
  
  export default RecommendedForYou;
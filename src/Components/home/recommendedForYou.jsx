import { Box, useScrollTrigger } from "@mui/material";
import ProductSlider from "../Products/ProductSlider";
import { useSelector } from "react-redux";

const RecommendedForYou = ({ sort_id, title }) => {
  const bestseller = useSelector((state) => state.bestseller.value);
  const recommendation = useSelector((state) => state.recommendation.value);
  const newarrive = useSelector((state) => state.newarrive.value);
  const mostviewed = useSelector((state) => state.mostviewed.value);
  const mostrated = useSelector((state) => state.mostrated.value);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <>
      {/* {bestseller.results.length > 0 &&
      recommendation.results.length > 0 &&
      newarrive.results.length > 0 &&
      mostviewed.results.length > 0 &&
      mostrated.results.length > 0 ? ( */}
        <Box
          sx={{
            flexGrow: 1,
            transition: "0.8s all",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingBottom: trigger ? "5%" : "8%",
            paddingTop: trigger ? "1%" : "2%",
          }}
        >
          <ProductSlider title={title} keyId={sort_id} />
        </Box>
      {/* ) : null} */}
    </>
  );
};

export default RecommendedForYou;

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BlackText, ItemsTitle, ProductTitle } from "../../Style/StyledComponents/Typography";

export const ProductItem = ({
  main_image,
  name,
  description,
  price,
  final_price,
}) => {
  const shopInfo =  JSON.parse(localStorage.getItem("shopInfo"))
  const navigate=useNavigate()
  const { i18n, t } = useTranslation();
  useEffect(() => {
    i18n.language == "ar" ? (document.dir = "rtl") : (document.dir = "ltr");
  }, [i18n.language]);

  return (
    <Box className="product" onClick={()=>navigate(`/t2/${shopInfo?.sub_domain}/products/${name}`)}>
      <Card sx={{ width: '345px', height:'320px',display:'flex', flexDirection: 'column',
    justifyContent: 'space-between'}}>
        <CardActionArea>
        {main_image ? (
          <CardMedia
            component="img"
            height="140"
            image={main_image}
            alt="Product Image"
          />
          ) : (
            <CardMedia
            component="img"
            height="140"
            image={shopInfo?.logo}
            alt="Product Image"
          />
          )}
          <CardContent sx={{}}>
            <ItemsTitle sx={{textAlign:'right'}}>
              {name.slice(0, 50)}
            </ItemsTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{fontFamily: "Cairo", textAlign:'right'}}
              dangerouslySetInnerHTML={{ __html: description.slice(0, 50) }}
            />
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 2,
            paddingBottom: 2,

          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "red", textDecorationLine: "line-through",fontFamily: "Cairo", }}
          >
            {price} {t("SAR")}
          </Typography>
          {/* <Typography variant='body1' sx={{ paddingRight: 2 }}>{discount} %</Typography> */}
          <Typography variant="body1" sx={{fontFamily: "Cairo",}}>{final_price} {t("SAR")}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

import {
  Avatar,
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
import {
  BlackText,
  ItemsTitle,
  ProductTitle,
} from "../../Style/StyledComponents/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
export const ProductItem = ({
  main_image,
  name,
  description,
  price,
  final_price,
  is_favorite,
  id,
}) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const product_route = `${name?.replace(" ", "_")}/${id}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const [RequestAddProductToFavorite, ResponseAddProductToFavorite] =
    useRequest({
      method: "POST",
      path: `${PRODUCTS}/${shopInfo?.id}/favorites/`,
    });

  const AddProductToFavorite = () => {
    RequestAddProductToFavorite({
      body: {
        product: id,
      },
      onSuccess: (res) => {
        dispatch({ type: "wishlist/addItem", payload: res.data });
      },
    });
  };
  const [RequestDeleteProductFromFavorite, ResponseDeleteProductFromFavorite] =
    useRequest({
      method: "Delete",
      path: `${PRODUCTS}/${shopInfo?.id}/favorites/`,
    });

  const DeleteProductFromFavorite = () => {
    RequestDeleteProductFromFavorite({
      body: {
        product: id,
      },
      onSuccess: (res) => {
        dispatch({ type: "wishlist/deleteItem", payload: res.data });
      },
    });
  };
  useEffect(() => {
    i18n.language == "ar" ? (document.dir = "rtl") : (document.dir = "ltr");
  }, [i18n.language]);

  return (
    <Box
      className="product"
      sx={{ position: "relative" }}
      onClick={() => {
        navigate(`/t2/${shopInfo?.sub_domain}/products/${product_route}`);
      }}
    >
      <Avatar
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
          zIndex: "1",
          cursor: "pointer",
        }}
      >
        {is_favorite ? (
          <FavoriteIcon
            sx={{ color: "red" }}
            onClick={DeleteProductFromFavorite}
          />
        ) : (
          <FavoriteBorderIcon onClick={AddProductToFavorite} />
        )}
      </Avatar>
      <Card
        sx={{
          width: "100%",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
            <ItemsTitle
              sx={{
                textAlign: "right",
                maxHeight: "3em", // Set the maximum height (3em for three lines)
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Limit th
              }}
            >
              {name.slice(0, 50)}
            </ItemsTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "Cairo",
                textAlign: "right",
                maxHeight: "3em", // Set the maximum height (3em for three lines)
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Limit th
              }}
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
            sx={{
              color: "red",
              textDecorationLine: "line-through",
              fontFamily: "Cairo",
            }}
          >
            {price} {t("SAR")}
          </Typography>
          {/* <Typography variant='body1' sx={{ paddingRight: 2 }}>{discount} %</Typography> */}
          <Typography variant="body1" sx={{ fontFamily: "Cairo" }}>
            {final_price} {t("SAR")}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

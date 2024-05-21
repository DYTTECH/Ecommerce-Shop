import React, { useEffect, useState } from "react";
import ResponsiveLayout from "../../Components/Layout/Layout";
import PageMeta from "../../Components/Layout/MetaPage";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "../../Components/Products/ProductItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ViewProductsSkeleton from "../../Components/Skeleton/ViewProductsSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterSkeleton from "../../Components/Skeleton/FilterSkeleton";
import CategoryMenu from "../../Components/Layout/categoryMenu";
import { InputPrice } from "../../Style/StyledComponents/Inputs";
import { TransparentButton } from "../../Style/StyledComponents/Buttons";
import { useTranslation } from "react-i18next";
import { BlackText } from "../../Style/StyledComponents/Typography";

export const Products = () => {
  const Products = useSelector((state) => state.products.value);
  const filter = useSelector((state) => state.filter.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // price filter function
  const handleFilterByPrice = (e, index) => {
    setFilterData((old) => ({
      ...old,
      min_price: price.min,
      max_price: price.max,
    }));
  };

  // filter by brand
  const handleBrandChange = (e, index, brand_id) => {
    console.log(e.target.checked);

    let data = filterdata?.brands ? [...filterdata.brands] : [];
    const in_brand = Boolean(
      filterdata?.brands?.find((brand) => brand === brand_id)
    );

    if (e.target.checked) {
      // Add the brand_id to the array if checked and not already present
      if (!in_brand) {
        data = [...data, brand_id];
      }
    } else {
      // Remove the brand_id from the array if unchecked and present
      if (in_brand) {
        data = data.filter((brand) => brand !== brand_id);
      }
    }

    setFilterData((old) => ({ ...old, brands: data }));
  };

  //  rate by filter
  const handleRateChange = (rate) => {
    const updatedRates = filterdata.rate ? [...filterdata.rate] : [];
    if (updatedRates.includes(rate)) {
      // If rate is already present, remove it
      const index = updatedRates.indexOf(rate);
      updatedRates.splice(index, 1);
    } else {
      // If rate is not present, add it
      updatedRates.push(rate);
    }
    setFilterData((old) => ({ ...old, rate: updatedRates }));
  };

  const handleAttributesChange = (e, index, attribute) => {
    let data = filterdata?.filters ? [...filterdata.filters] : [];
    const in_filter = Boolean(
      filterdata?.filters?.find((attr) => attr === attribute)
    );

    if (e.target.checked) {
      // Add the brand_id to the array if checked and not already present
      if (!in_filter) {
        data = [...data, attribute];
      }
    } else {
      // Remove the brand_id from the array if unchecked and present
      if (in_filter) {
        data = data.filter((brand) => brand !== attribute);
      }
    }

    setFilterData((old) => ({ ...old, filters: data }));
  };
  // params to send in request for filter
  let params = {};

  if (location?.state?.keys?.brand_id || filterdata?.brands) {
    params["brand"] = [
      ...(filterdata?.brands || []), // Handling if filterdata.brands is undefined
      ...(location?.state?.keys?.brand_id
        ? [location.state.keys.brand_id]
        : []), // Adding location.state.keys.brand_id if it exists
    ];
  }

  if (filterdata.filters) {
    params["filters"] = [...filterdata.filters];
  }

  if (filterdata.min_price) {
    params["min_price"] = filterdata.min_price;
  }

  if (filterdata.max_price) {
    params["max_price"] = filterdata.max_price;
  }

  if (filterdata.rate) {
    params["rate"] = filterdata.rate;
  }
  if (location?.state?.keys?.sort_id) {
    params["query_id"] = location?.state?.keys?.sort_id;
  }
  if (location?.state?.keys?.category_id) {
    params["categories"] = location?.state?.keys?.category_id;
  }
  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  // filter data to view products
  const [RequestGetProductFilterd, ResponseGetProductFilterd] = useRequest({
    method: "Get",
    path: PRODUCTS + shopInfo.id + `/products/?${queryString}`,
  });
  // view filter sidebar
  const [RequestGetFilter, ResponseGetFilter] = useRequest({
    method: "Get",
    path: PRODUCTS + shopInfo.id + `/filter-attributes/`,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
   
    RequestGetFilter({
      onSuccess: (res) => {
        dispatch({ type: "filter/set", payload: res?.data });
      },
    });
  }, [location?.state?.keys ]);

useEffect(()=>{
  RequestGetProductFilterd({
    params: {
      page: page || 1,
    },
    onSuccess: (res) => {
      dispatch({ type: "products/set", payload: res?.data });
    },
  });
},[page,filterdata])

  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo.sub_domain} - My Products`}
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />
      <Grid
        container
        spacing={2}
        sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" } }}
      >
        <Grid item md={3} xs={0}  sx={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
          {ResponseGetFilter.isPending ? (
            <FilterSkeleton />
          ) : (
            Object.keys(filter).map((key) => (
              <Accordion
                elevation={0}
                expanded={expanded === filter[key]}
                onChange={handleChangeExpanded(filter[key])}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <BlackText sx={{ flexShrink: 0, fontFamily: "Cairo" }}>
                    {key === "Price"
                      ? t("Price")
                      : key === "Rate"
                      ? t("Rates")
                      : key === "brands"
                      ? t("Brands")
                      : key === "attributes"
                      ? t("Attributes")
                      : key}
                  </BlackText>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(filter[key]) ? (
                    key === "Price" ? (
                      <Stack gap={2} direction="column">
                        <Stack gap={1} direction="row">
                          {filter[key].map((item, index) => (
                            <InputPrice
                              key={index}
                              name={item}
                              value={price[item]}
                              onChange={(e) =>
                                setPrice((old) => ({
                                  ...old,
                                  [item]: e.target.value,
                                }))
                              }
                            />
                          ))}
                        </Stack>

                        <TransparentButton
                          sx={{ color: "#61A98D !important" }}
                          onClick={() => handleFilterByPrice()}
                        >
                          {t("Apply")}
                        </TransparentButton>
                      </Stack>
                    ) : key === "Rate" ? (
                      filter[key].map((rate, index) => (
                        <Stack
                          gap={1}
                          direction="row"
                          key={index}
                          alignItems="center"
                        >
                          <Checkbox
                            checked={Boolean(filterdata?.rate?.includes(rate))}
                            onChange={(e) => {
                              handleRateChange(rate); // Pass brand.id as an additional parameter
                            }}
                            name={rate}
                          />
                          <Rating name="simple-controlled" value={rate} />
                        </Stack>
                      ))
                    ) : key === "brands" ? (
                      filter[key].map((brand, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              name={brand.name}
                              id={index}
                              checked={Boolean(
                                filterdata?.brands?.includes(brand.id)
                              )}
                              onChange={(e) => {
                                handleBrandChange(e, index, brand.id); // Pass brand.id as an additional parameter
                              }}
                            />
                          }
                          label={brand.name}
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",
                            fontSize: "14px",
                            width: "40%",
                            ".MuiFormControlLabel-label": {
                              fontFamily: "Cairo",
                            },
                          }}
                        />
                      ))
                    ) : (
                      key === "attributes" &&
                      filter[key].map((attribute, index) => (
                        <Accordion
                          disableGutters
                          elevation={0}
                          key={index}
                          sx={{ width: "100%" }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <BlackText>{attribute?.name}</BlackText>
                          </AccordionSummary>
                          <AccordionActions>
                            <Stack
                              gap={1}
                              flexDirection={"row"}
                              justifyContent={"flex-start"}
                              flexWrap={"wrap"}
                              width={"100%"}
                            >
                              {attribute.values.map((value) =>
                                value.iscolor == true ? (
                                  <Checkbox
                                    key={value.id}
                                    name={`${value?.value_name}`}
                                    label=""
                                    id={index}
                                    sx={{
                                      bgcolor: value?.color_value,
                                      ":hover": {
                                        bgcolor: value?.color_value,
                                      },
                                      "& .MuiSvgIcon-root": {
                                        display: "none", // Hide the checkbox icon
                                      },
                                      "& .Mui-checked": {
                                        "& .MuiIconButton-root": {
                                          border: "2px solid #fff",
                                          bgcolor: value?.color_value,
                                        },
                                      },
                                      height: "20px",
                                      width: "20px",
                                    }}
                                    value={value.attribute_id}
                                    checked={Boolean(
                                      filterdata?.filters?.includes(value.id)
                                    )}
                                    onChange={(e) => {
                                      handleAttributesChange(
                                        e,
                                        index,
                                        value.id
                                      );
                                    }}
                                  />
                                ) : (
                                  value.iscolor == false && (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name={value.value_name}
                                          id={index}
                                          value={value.attribute_id}
                                          checked={Boolean(
                                            filterdata?.filters?.includes(
                                              value.id
                                            )
                                          )}
                                          onChange={(e) => {
                                            handleAttributesChange(
                                              e,
                                              index,
                                              value.id
                                            );
                                          }}
                                        />
                                      }
                                      label={value?.value_name}
                                      sx={{
                                        ".MuiFormControlLabel-label": {
                                          fontFamily: "Cairo",
                                        },
                                      }}
                                    />
                                  )
                                )
                              )}
                            </Stack>
                          </AccordionActions>
                        </Accordion>
                      ))
                    )
                  ) : null}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Grid>
        <Grid item md={9} xs={12} sx={{ height: "calc(100vh - 100px)", overflowY: "auto" ,overflowX:"hidden"}}>
          <Grid container spacing={3} px={2}>
            {ResponseGetProductFilterd.isPending ? (
              <ViewProductsSkeleton />
            ) : (
              Products?.results?.map((item) => (
                <Grid item md={3} xs={6} key={item.id}>
                  <ProductItem {...item} />
                </Grid>
              ))
            )}
          </Grid>
          {/* Your products will be displayed here. You can */}
          <Stack
            spacing={2}
            mt={2}
            mb={2}
            justifyContent="center"
            alignItems="center"
            sx={{ paddingY: 4 }}
          >
            {Products?.count > 0 && Products?.count > 8 && (
              <Pagination
                count={Math.ceil(Products.count / 8)}
                page={page}
                onChange={handleChange}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </ResponsiveLayout>
  );
};

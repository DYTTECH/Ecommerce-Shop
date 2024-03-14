import React, { useEffect, useState } from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import PageMeta from '../../Components/Layout/MetaPage'
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid, Pagination, PaginationItem, Rating, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import useRequest from '../../Hooks/useRequest'
import { PRODUCTS } from '../../Data/API'
import { useDispatch, useSelector } from 'react-redux'
import { ProductItem } from '../../Components/Products/ProductItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ViewProductsSkeleton from '../../Components/Skeleton/ViewProductsSkeleton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterSkeleton from '../../Components/Skeleton/FilterSkeleton'
export const Products = () => {
  const Products=useSelector((state)=>state.products.value)
  const filter=useSelector((state)=>state.filter.value)
  const shopInfo =  JSON.parse(localStorage.getItem("shopInfo"))
  const [page,setPage]=useState(1)
  const [expanded, setExpanded] =useState(false);
   const [filterdata, setFilterData] = useState({});
   const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
   const [value, setValue] = useState(0);
  const location=useLocation()
  const dispatch=useDispatch()
  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFilterByPrice = (e, index) => {
    setFilterData((old) => ({
      ...old,
      min_price: startPrice,
      max_price: endPrice,
    }));
  };
   const handleRateChange = (value) => {
    setValue(value);
    setFilterData((old) => ({ ...old, rate: value }));
    //  handleFilter({ rate: value });
  };

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

let params = {};
      
if (location?.state?.keys?.brand_id) {
  params['brand'] = [location?.state?.keys?.brand_id];
}

// if (data.filters) {
//   params['filters'] = [...data.filters];
// }

// if (data.min_price) {
//   params['min_price'] = data.min_price;
// }

// if (data.max_price) {
//   params['max_price'] = data.max_price;
// }

// if (data.rate) {
//   params['rate'] = [...data.rate];
// }
if (location?.state?.keys?.sort_id) {
  params['query_id'] =location?.state?.keys?.sort_id;
}
 if (location?.state?.keys?.category_id) {
   params['categories'] =location?.state?.keys?.category_id;
 }
const queryString = Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

const [RequestGetProductFilterd, ResponseGetProductFilterd] = useRequest({
  method: "Get",
  path: PRODUCTS+shopInfo.id+`/products/?${queryString}`,
});

const [RequestGetFilter, ResponseGetFilter] = useRequest({
  method: "Get",
  path: PRODUCTS+shopInfo.id+`/filter-attributes/`,
});

const handleChange = (event, value) => {
  setPage(value);
};


  useEffect(() => {
    RequestGetProductFilterd({
      params:{
        page:page||1,
      },
      onSuccess: (res) => {
        dispatch({type: "products/set", payload:res?.data});
      
      },
    })  
    RequestGetFilter({
      onSuccess: (res) => {
        dispatch({type: "filter/set", payload:res?.data});
      
      },
    })  
  }, [location?.state?.keys,page])

  

 useEffect(() => {
  // Ensure location and its properties are defined
  // if (location?.state?.keys?.sort_id != null) {
  //   switch (location?.state?.keys?.sort_id) {
  //     case 1:
  //       setProducts(bestseller);
  //       break;
  //     case 2:
  //       setProducts(recommendation);
  //       break;
  //     case 3:
  //       setProducts(newarrive);
  //       break;
  //     case 4:
  //       setProducts(mostviewed);
  //       break;
  //     case 5:
  //       setProducts(mostrated);
  //       break;
  //     default:
  //       setProducts(bestseller);
  //       break;
  //   }
  // }else if(location?.state?.keys?.brand_id){
  //   setProducts(Prorductsbrand)
  // }
}, [location?.state?.keys?.sort_id, page]);
useEffect(() => {
    if (!Object?.keys(filterdata)?.length) {
      return ;
    }
    // handleFilter(filterdata);
  }, [filterdata]);
 console.log(filter);
  return (
    <ResponsiveLayout>
        <PageMeta
        title="My Products"
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />

        <Grid container spacing={2} >
          <Grid item md={3} xs={0}  position={"sticky"} >
          {ResponseGetFilter.isPending?
            <FilterSkeleton/>
          :Object.keys(filter).map((key)=>(
             <Accordion
             elevation={0}
             expanded={expanded === filter[key]} onChange={handleChangeExpanded(filter[key])}>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1bh-content"
               id="panel1bh-header"
             >
               <Typography sx={{ flexShrink: 0 }}>
                 {key}
               </Typography>
             </AccordionSummary>
             <AccordionDetails>
              {
                Array.isArray(filter[key])?
                key==='Price'?
                filter[key].map((item,index)=>(
                
                  <FormControlLabel
                  key={index}
                    control={
                      <Checkbox
                        // checked={ItemChecked(item)}
                        // onChange={()=>HandleCheckBox(item)}
                        //  name={index}

                      />
                    }
                    label={item}
                  />
                  ))
                :key==='Rate'?
                filter[key].map((item,index)=>(
                  <Stack gap={1} key={index} direction="row">
                     <Checkbox
                         checked={item}
                        onChange={()=>handleRateChange(item)}
                          name={index}

                      />
                <Rating
               
                name="simple-controlled"
                value={item}
                
              />
              </Stack>))
                :
                filter[key].map((item,index)=>(
                
                  <FormControlLabel
                  key={index}
                    control={
                      <Checkbox
                        // checked={ItemChecked(item)}
                        // onChange={()=>HandleCheckBox(item)}
                        // name={item}
                      />
                    }
                    label={item.name}
                    sx={{textTransform:"capitalize",fontWeight:"600",fontSize:"14px",width:"40%"}}
                  />
                  )):null
              }
              
             </AccordionDetails>
           </Accordion>
          ))}
          
          </Grid>
          <Grid item md={9} xs={12} >
            <Grid container spacing={3} px={2}>
            {ResponseGetProductFilterd.isPending?(
             <ViewProductsSkeleton/>
            ):(
              Products?.results?.map((item)=>(
              <Grid item md={3}  xs={6} key={item.id}>
                  <ProductItem {...item}/>
              </Grid>
                ))
              )}
            </Grid>
            {/* Your products will be displayed here. You can */}
            <Stack spacing={2} mt={2} mb={2} justifyContent="center" alignItems="center">
              {Products?.count > 0 && Products?.count > 8 && (
                <Pagination
                  count={Math.ceil(Products.count/8)}
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
  )
}

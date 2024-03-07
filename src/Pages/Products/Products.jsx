import React, { useEffect, useState } from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import PageMeta from '../../Components/Layout/MetaPage'
import { Grid, Pagination, PaginationItem, Stack } from '@mui/material'
import { useLocation } from 'react-router-dom'
import useRequest from '../../Hooks/useRequest'
import { PRODUCTS } from '../../Data/API'
import { useDispatch, useSelector } from 'react-redux'
import { ProductItem } from '../../Components/Products/ProductItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Products = () => {
  const bestseller=useSelector((state)=>state.bestseller.value)
  const recommendation=useSelector((state)=>state.recommendation.value)
  const newarrive=useSelector((state)=>state.newarrive.value)
  const mostviewed=useSelector((state)=>state.mostviewed.value)
  const mostrated=useSelector((state)=>state.mostrated.value)
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)
  const shopInfo =  JSON.parse(localStorage.getItem("shopInfo"))
  const location=useLocation()
  const dispatch=useDispatch()

const [RequestGetProductSort, ResponseGetProductSort] = useRequest({
  method: "Get",
  path: PRODUCTS+shopInfo.id+`/products/?query_id=${location?.state?.keys?.sort_id}`,
});


const handleChange = (event, value) => {
  setPage(value);
};

  useEffect(() => {
    RequestGetProductSort({
      params:{
        page:page||1,
      },
      onSuccess: (res) => {
        switch (location?.state?.keys?.sort_id) {
          case 1:
            dispatch({ type: "bestseller/set", payload: res.data });
            break;
          case 2:
            dispatch({ type: "recommendation/set", payload: res.data });
            break;
            case 3:
            dispatch({ type: "newarrive/set", payload: res.data });
            break;
            case 4:
            dispatch({ type: "mostviewed/set", payload: res.data });
            break;
            case 5:
            dispatch({ type: "mostrated/set", payload: res.data });
            break;
          default:
            dispatch({ type: "products/set", payload: res.data });
            // Default case if keyId doesn't match any of the specified cases
            break;
        }
       
      },
      onError: (err) => {
        dispatch({type: "newarrive/reset", payload:err.message});
      }
    })
    
  
  }, [location?.state?.keys?.sort_id,page,products])

 useEffect(() => {
  // Ensure location and its properties are defined
  if (location?.state?.keys?.sort_id != null) {
    switch (location.state.keys.sort_id) {
      case 1:
        setProducts(bestseller);
        break;
      case 2:
        setProducts(recommendation);
        break;
      case 3:
        setProducts(newarrive);
        break;
      case 4:
        setProducts(mostviewed);
        break;
      case 5:
        setProducts(mostrated);
        break;
      default:
        setProducts(bestseller);
        break;
    }
  }
}, [location?.state?.keys?.sort_id, page, products]);

  

  return (
    <ResponsiveLayout>
        <PageMeta
        title="My Products"
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />

        <Grid container spacing={2}>
          <Grid md={3} xs={0}></Grid>
          <Grid md={9} xs={12} px={2}>
            <Grid container spacing={3}>
            {ResponseGetProductSort.isPending?(
              <h1>Loading...</h1>
            ):(
              products?.results?.map((item)=>(
                
            
              <Grid item md={3}  xs={6} key={item.id}>
                  <ProductItem {...item}/>
              </Grid>
                ))
              )}
            </Grid>
            {/* Your products will be displayed here. You can */}
            <Stack spacing={2} mt={2} mb={2} justifyContent="center" alignItems="center">
      <Pagination
        count={Math.ceil(products.count/8)}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
          </Grid>
        </Grid>
        </ResponsiveLayout>
  )
}

import React from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import PageMeta from '../../Components/Layout/MetaPage'
import { Container, Grid } from '@mui/material'

const Cart = () => {
    const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  return (
    <ResponsiveLayout>
    <PageMeta
        title={`${shopInfo?.sub_domain}-Wishlist`}
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />
      <Container maxWidth='xl' >
    <Grid container  spacing={3}>
    <Grid item xs={12} sm={6} md={8}></Grid>
    <Grid item xs={12} sm={6} md={4} ></Grid>
    </Grid>
      </Container>
   </ResponsiveLayout>
  )
}

export default Cart
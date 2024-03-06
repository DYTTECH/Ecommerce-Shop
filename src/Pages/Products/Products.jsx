import React, { useEffect } from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import PageMeta from '../../Components/Layout/MetaPage'
import { Grid } from '@mui/material'

export const Products = () => {

  useEffect(() => {
    
  }, [])
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
          <Grid md={3}></Grid>
          <Grid md={9}>
            {/* Your products will be displayed here. You can */}
          </Grid>
        </Grid>
        </ResponsiveLayout>
  )
}

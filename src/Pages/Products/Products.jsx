import React from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import PageMeta from '../../Components/Layout/MetaPage'

export const Products = () => {
  return (
    <ResponsiveLayout>
        <PageMeta
        title="My Products"
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />
        Products
        </ResponsiveLayout>
  )
}

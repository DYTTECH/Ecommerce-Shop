import { Box, Skeleton } from '@mui/material'
import React from 'react'

const BannerSkeleton = () => {
  return (
    <Box><Skeleton variant="rectangular" width={"100%"} height={330} /></Box>
  )
}

export default BannerSkeleton
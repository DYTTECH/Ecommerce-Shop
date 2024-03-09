import { Box, Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'

const ViewProductsSkeleton = () => {
  return (
    <Grid container spacing={2}>
   {Array.from({ length: 12}, (_, index) => (
    <Grid item md={3} xs={6}>
          <Stack
            flexDirection={"column"}
            justifyContent={"center"}
            spacing={1}
            key={index}
            sx={{ width: "100%" }}
          >
            <Skeleton variant="rectangular"  height={250} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton animation="wave" />
              <Skeleton width="60%" animation="wave" />
            </Box>
          </Stack>
          </Grid>
))}
    </Grid>
  )
}

export default ViewProductsSkeleton
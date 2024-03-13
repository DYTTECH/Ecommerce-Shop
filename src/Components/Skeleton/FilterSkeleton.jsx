import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const FilterSkeleton = () => {
  return (
    <Stack gap={2} sx={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {
            Array.from({ length: 6 }, (_, index) => (
                <Skeleton variant="text" width={'80%'}  key={index} />
            ))
        }
    </Stack>
  )
}

export default FilterSkeleton
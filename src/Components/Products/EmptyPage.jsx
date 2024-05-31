import React from 'react';
import { Stack, Typography } from '@mui/material';
import EmptyImage from '../../assets/images/Empty.gif'
const EmptyPage = () => {
  return (
    <Stack 
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: "100%"
      }}
    >
      <img src={EmptyImage}alt="empty" />
      <Typography 
        variant='h4' 
        sx={{
          color: '#000000',
          fontFamily: 'Cairo, sans-serif',
          fontSize: '20px',
          fontWeight: 500,
          lineHeight: '20px',
          textAlign: 'center',
          mt: 2
        }}
      >
        No results found for “sefd”. Check the spelling or use a different word or phrase.
      </Typography>
    </Stack>
  );
};

export default EmptyPage;

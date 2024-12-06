import React from 'react';
import { Container, Box } from '@mui/material';
import Flight from './components/Flight';
import FlightOptions from './components/FlightOptions';

const App = () => {
  return (
    <Container maxWidth="xl" sx={{ width: '100%'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* <FlightOptions /> */}
        <Flight />
      </Box>
    </Container>
  );
};

export default App;

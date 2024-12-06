import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Box, TextField } from '@mui/material';
import Airport from './Airport';
import { searchFlights } from '../api';
import FlightCard from './FlightCard';

const Flight = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearchFlights = async () => {
    if (!origin || !destination || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    const originSkyId = origin.skyId;
    const destinationSkyId = destination.skyId;
    const originEntityId = origin.entityId;
    const destinationEntityId = destination.entityId;

    try {
      const response = await searchFlights(
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date
      );

      if (response?.status === true) {
        const itineraries = response.data.itineraries;
        if (itineraries && itineraries.length > 0) {
          setFlights(itineraries);
        } else {
          setError('No flights found.');
          setFlights([]);
        }
      } else {
        setError('Failed to fetch valid flight data.');
        setFlights([]);
      }
    } catch (error) {
      setError('Error fetching flight data.');
      setFlights([]);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 4 }, py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">Flight Search</Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Airport label="Origin" onChange={setOrigin} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Airport label="Destination" onChange={setDestination} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSearchFlights}>
          Search Flights
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}

      {flights.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Flight;

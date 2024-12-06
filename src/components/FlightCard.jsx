import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FlightCard = ({ flight }) => {

  const segments = flight.legs?.[0]?.segments || [];
  const stopCount = flight.legs?.[0]?.stopCount || 0;
  
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  

  const calculateLayoverTime = (arrivalTime, nextDepartureTime) => {
    const arrival = new Date(arrivalTime);
    const nextDeparture = new Date(nextDepartureTime);
    const diff = nextDeparture - arrival;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours} hr ${minutes} min`;
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    const durationInMilliseconds = arrival - departure;

    const hours = Math.floor(durationInMilliseconds / 1000 / 60 / 60);
    const minutes = Math.floor((durationInMilliseconds / 1000 / 60) % 60);

    return { hours, minutes };
  };

  const stopLocations = segments
    .slice(0, stopCount)
    .map((segment) => segment.destination.displayCode)
    .join(', ');

  console.log('segments', segments)

  const departureTime = flight.legs[0]?.departure;
  const arrivalTime = flight.legs[0]?.arrival;

  const { hours, minutes } = calculateDuration(departureTime, arrivalTime);
  return (
    <Accordion sx={{ }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {/* Flight Summary: Airline Logo */}
        <Grid container spacing={2}>
          {/* Column 1: Airline Logo */}
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            {flight.legs?.[0].carriers?.marketing?.[0] && (
              <Box>
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  style={{ width: 60, height: 'auto' }}
                />
              </Box>
            )}
          </Grid>

          {/* Column 2: Departure Aravil and Airline name */}
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {formatTime(flight.legs[0].departure)} - {formatTime(flight.legs[0].arrival)}
            </Typography>
            <Typography variant="body2" color="gray">
              {flight.legs?.[0].carriers?.marketing?.[0].name}
            </Typography>
          </Grid>

          {/* Column 3: Travel duration and Airlines Skyid */}
          <Grid item xs={2}>
            <Typography variant="body2">
              {hours} hr {minutes} min
            </Typography>
            <Typography variant="body2" color="gray">
              {flight.legs[0]?.origin.id}-{flight.legs[0].destination.id}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2">
              {flight.legs[0].stopCount > 0 ? `${flight.legs[0].stopCount} stop` : 'Nonstop'}
            </Typography>
            <Typography variant="body2" color="gray">
              {stopCount > 1 && stopLocations && (
                <Typography variant="body2" color="gray">
                  {stopLocations}
                </Typography>
              )}

              {stopCount === 1 && segments[0] && segments[1] && (
                <Typography variant="body2" color="gray">
                  {calculateLayoverTime(segments[0].arrival, segments[1].departure)} - {segments[0].destination.displayCode}
                </Typography>
              )}
            </Typography>
          </Grid>

          {/* Column 4: CO2e and Emissin */}
          <Grid item xs={2}>
            {flight.eco && flight.eco.ecoContenderDelta ? (
              <Typography variant="body2" color="gray">
                {(flight.eco.ecoContenderDelta).toFixed(2)}% emissions
              </Typography>
            ) : (
              <Typography variant="body2" color="gray">
                No available emission data
              </Typography>
            )}
          </Grid>

          {/* Column 4: PRice */}
          <Grid item xs={2}>
            {flight.price && (
              <Typography
                variant="body2"
                sx={{
                  color: flight.tags && flight.tags.some(tag => tag.includes("cheapest")) ? "green" : "gray",
                }}>

                USD {flight.price.raw}
              </Typography>
            )}
          </Grid>
        </Grid>
      </AccordionSummary>

      <Divider sx={{ marginY: 2 }} />

      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Flight Details</Typography>
            {segments.map((segment, index) => (
              <Grid container spacing={2} key={segment.id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                {/* Departure Time and Airport */}
                <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      border: '2px solid #8c8c8c',
                      borderRadius: '12px',
                      height: '12px',
                      width: '12px',
                      marginRight: '8px',
                    }}
                  />
                  <Typography variant="body2" color="primary">
                    {formatTime(segment.departure)} * {segment.origin.name} ({segment.origin.displayCode})
                  </Typography>
                </Grid>

                {/* Travel Time (Layover or Direct) */}
                <Grid item xs={12} sm={3} sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  marginBottom: '4px', 
                  marginTop: '4px',
                }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '22px',
                      top: 0,
                      bottom: '-15px',
                      width: '4px',
                      borderLeft: '4px dotted #8c8c8c',
                    }}
                  />

                  {index < segments.length && (
                    <Typography variant="body2" color='gray'>
                      Travel time: {calculateLayoverTime(segment.arrival, segments[index]?.departure)}
                    </Typography>
                  )}
                </Grid>

                {/* Arrival Time and Airport */}
                <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      border: '2px solid #8c8c8c',
                      borderRadius: '12px',
                      height: '12px',
                      width: '12px',
                      marginRight: '8px',
                    }}
                  />
                  <Typography variant="body2" color="primary">
                    {formatTime(segment.arrival)} * {segment.destination.displayCode} ({segment.destination.name})
                  </Typography>
                </Grid>

                {/* Flight Details (Flight Number) */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="gray">
                    Flight number: {segment.flightNumber}
                  </Typography>
                </Grid>

                <Divider sx={{ marginY: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightCard;

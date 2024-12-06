import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Radio, RadioGroup, Grid, Button } from '@mui/material';

const FlightOptions = ({ roundTrip, setRoundTrip, passengers, setPassengers, classType, setClassType }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Round Trip / One Way */}
      <Grid item xs={12} sm={4}>
        <FormControl component="fieldset">
          <RadioGroup row value={roundTrip ? 'roundtrip' : 'oneway'} onChange={(e) => setRoundTrip(e.target.value === 'roundtrip')}>
            <FormControlLabel value="roundtrip" control={<Radio />} label="Round Trip" />
            <FormControlLabel value="oneway" control={<Radio />} label="One Way" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Number of Passengers */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Passengers"
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          fullWidth
          inputProps={{ min: 1 }}
        />
      </Grid>

      {/* Class Type */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Class</InputLabel>
          <Select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            label="Class"
          >
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="First Class">First Class</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FlightOptions;

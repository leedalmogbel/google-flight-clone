import React, { useState, useCallback } from 'react';
import { TextField, Autocomplete, CircularProgress, InputAdornment } from '@mui/material';
import { searchAirports } from '../api';
import { debounce } from 'lodash';

const Airport = ({ label, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchAirports(query);
        console.log('API response:', data);

        if (data?.data && data.data.length > 0) {
          setOptions(data.data);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error('Error fetching airports', error);
        setOptions([]);
      }
      setLoading(false);
    }, 500),
    []
  );

  const handleInputChange = (event, value) => {
    debouncedSearch(value);
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.presentation.suggestionTitle || option.presentation.title}
      onInputChange={handleInputChange}
      onChange={(event, value) => onChange(value)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: loading ? (
              <InputAdornment position="start">
                <CircularProgress color="inherit" size={20} />
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
};

export default Airport;

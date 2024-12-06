import axios from "axios";

const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1';
const API2_URL = 'https://sky-scrapper.p.rapidapi.com/api/v2';
const API_KEY = 'd9953f7b70msh29c8f0fe1d22ec6p122248jsnef3dbb62969f';


export const searchAirports = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/flights/searchAirport`, {
      params: { query },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      }
    });

    console.log('searchAirports', response)
    return response.data;
  } catch (error) {
    console.error('airport', error)
  }
};

export const searchFlights = async (originSkyID, destSkyID, originEntityId, destinationEntityId,  date) => {
  try {
    const response = await axios.get(`${API2_URL}/flights/searchFlights`, {
      params: {
        originSkyId: originSkyID,
        destinationSkyId: destSkyID,
        originEntityId: originEntityId,
        destinationEntityId: destinationEntityId,
        date: date,
        cabinClass: 'economy',
        adults: 1,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      }
    })

    console.log('searchFlights', response)
    return response.data;
  } catch (error) {
    console.error('flight', error)
  }
};
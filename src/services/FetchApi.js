import axios from 'axios';
import swal from 'sweetalert';

axios.defaults.baseURL = `https://swapi.dev/api`;

///first req
export const charFetchApi = async page => {
  if (!page) {
    try {
      const firstResponse = await axios.get(`/people/`);
      return firstResponse.data;
    } catch (error) {
      throw error;
    }
  } else {
    const response = await axios.get(`/people/?page=${page}`);
    if (response.data.next === null) {
      swal('All characters are already shown');
    }
    return response.data;
  }
};

let allRes = [];
export const allFetch = async value => {
  let newArr = [];
  allRes = []; //clear from last session
  const response = await axios.get(`https://swapi.dev/api/${value}/?page=1`); //first for next
  allRes.push(...response.data.results);
  if (response.data.next) {
    newArr = await allResponses(response.data.next);
  }
  return newArr;
};
const allResponses = async next => {
  const response = await axios.get(`${next}`); //nexts
  allRes.push(...response.data.results);
  if (response.data.next) {
    allResponses(response.data.next);
  }
  return allRes;
};

///for films
export const filmsFetch = async () => {
  try {
    const filmsRes = await axios.get(`/films/`);
    return filmsRes.data.results;
  } catch (error) {
    throw error;
  }
};

///for search query
export const fetchApiQuery = async query => {
  try {
    const res = await axios.get(`/people/?search=${query}`);

    if (!res.data.count) {
      swal('No results. Try another query');
      return null;
    }
    if (res.data.count > 10) {
      swal('Please provide more info');
      return;
    }

    return res.data.results;
  } catch (error) {
    throw error;
  }
};

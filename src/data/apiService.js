// src/services/apiService.js
import axios from 'axios';

const API_KEY = '47ba1a2d82874ebdb51137ca85c05bf4';

export const fetchTeams = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/teams`, {
    headers: { 'X-Auth-Token': API_KEY }
  });
  return response.data.teams;
};

export const fetchMatches = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/matches`, {
    headers: { 'X-Auth-Token': API_KEY },
    params: { status: 'SCHEDULED' }
  });
  return response.data.matches;
};

export const fetchResultsLive = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/matches`, {
    headers: { 'X-Auth-Token': API_KEY },
    params: { status: 'LIVE' }
  });
  return response.data.matches;
};

export const fetchResults = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/matches`, {
    headers: { 'X-Auth-Token': API_KEY },
    params: { status: 'FINISHED' }
  });
  return response.data.matches;
};

export const fetchLeagues = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/standings`, {
    headers: { 'X-Auth-Token': API_KEY },
  });
  return response.data.standings;
};

export const fetchScores = async () => {
  const response = await axios.get(`/api/v4/competitions/PL/scorers`, {
    headers: { 'X-Auth-Token': API_KEY },
  });
  return response.data.scorers;
};

export const fetchShopItems = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

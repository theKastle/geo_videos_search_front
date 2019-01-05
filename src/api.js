import axios from './axios';

export const searchVideos = (token, lat, lng, radius, pageToken) => {
  return axios.get(
    `/videos?lat=${lat}&lng=${lng}&radius=${radius}km&pageToken=${pageToken || ''}&maxResults=5`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

export const authenticate = (email, password) => {
  const data = {
    strategy: 'local',
    email,
    password
  };

  return axios.post(`/authentication`, data);
};

export const signup = (email, password) => {
  const data = {
    strategy: 'local',
    email,
    password
  };

  return axios.post(`/users`, data);
};

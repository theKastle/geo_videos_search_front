import axios from './axios';

export const searchVideos = (token, lat, lng, radius, pageToken) => {
  return axios.get(
    `/videos?lat=${lat}&lng=${lng}&radius=${radius}km&pageToken=${pageToken || ''}&maxResults=5`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

export const authenticate = (username, password) => {
  const data = {
    strategy: 'local',
    username,
    password
  };

  return axios.post(`/authentication`, data);
};

export const signup = (username, password, fullname) => {
  const data = {
    strategy: 'local',
    username,
    password,
    fullname
  };

  console.log(data)

  return axios.post(`/users`, data);
};

import axios from './axios';

export const searchVideos = (token, lat, lng, radius) => {
  console.log(token)
  return axios.get(`/videos?lat=${lat}&lng=${lng}&radius=${radius}km`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:3030';

const axiosInstance = axios.create({
  baseURL
});

// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + `eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YjBjZGQ4ZWRlY2I0NDA2N2NhMmM2ODciLCJpYXQiOjE1Mjc1NzA2NzAsImV4cCI6MTUyNzY1NzA3MCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiMmE5NWM5ZmUtZDczMy00YTdiLWE5ZmQtN2I0NWQ4YmVkNjBjIn0.6fKTXUKTzODBVVz3Qnq6thqK31Qz2mxbUMRa5mtAIPw`;

export default axiosInstance;
import axios from 'axios';

const mockAPI = axios.create({
  baseURL: 'https://node-app-coss.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getNewsFeed = async searchParams => {
  try {
    const response = await mockAPI.get(`/posts`, { params: searchParams });
    return response;
  } catch (e) {
    console.log(e.message);
  }
};

export const getProfileDetails = async id => {
  try {
    const { data } = await mockAPI.get(`/users/${id}`);
    return data[0];
  } catch (e) {
    console.log(e.message);
  }
};

export const createNewPost = async post => {
  try {
    const response = await mockAPI.post(`/posts`, JSON.stringify(post));
    if (!response.ok && response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

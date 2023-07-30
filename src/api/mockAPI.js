import axios from 'axios';

const mockAPI = axios.create({
  baseURL: 'https://murmuring-spire-16258-e111b21c7a09.herokuapp.com/api',
});

export const getNewsFeed = async () => {
  try {
    const { data } = await mockAPI.get(`/posts`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getProfileDetails = async (id) => {
  try {
    const { data } = await mockAPI.get(`/users/${id}`);
    return data[0];
  } catch (e) {
    console.log(e.message);
  }
};

export const getProfilePosts = async (id) => {
  try {
    const { data } = await mockAPI.get(`/posts/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};


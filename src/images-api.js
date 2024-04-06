import axios from 'axios';

const KEY_USER = 'PXRoCgB3T0DepDcrOvvK3rkUzJUyZfzV2m00tRp2vYM';
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesWithKeyword = async (word, page) => {
  const response = await axios.get(
    `search/photos/?client_id=${KEY_USER}&query=${word}&page=${page}&per_page=20}`
  );
  return response.data;
};


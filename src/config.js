const TOKEN_API = 'foo';

export const API_URL = 'https://api.spotify.com/v1';

export const getHeader = (token) => {
  const header = {
    headers: {
      Authorization: `'Bearer  ${token || TOKEN_API}'`,
    },
  };

  return header;
};

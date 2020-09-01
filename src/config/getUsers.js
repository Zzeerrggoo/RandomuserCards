import { RANDOMUSER_CONFIG, BASE_URL } from '.';
import queryString from 'query-string';

export const getUsers = config => {
  const res_config = { ...config, ...RANDOMUSER_CONFIG };

  return fetch(
    `${BASE_URL}?${queryString.stringify(res_config, { arrayFormat: 'comma' })}`
  ).then(resolve => resolve.json());
};

import queryString from 'query-string';
import _ from 'lodash';
import { USER } from '../config';

export const getUsers = queryParams => {
  const {
    baseUrl,
    get: {
      users: { defaultQueryParams, allowedQueryParams },
    },
  } = USER;

  const params = _.pick(
    { ...defaultQueryParams, ...queryParams },
    allowedQueryParams
  );

  const queryParamsStr = queryString.stringify(params, {
    arrayFormat: 'comma',
  });

  return fetch(`${baseUrl}?${queryParamsStr}`).then(resolve => resolve.json());
};

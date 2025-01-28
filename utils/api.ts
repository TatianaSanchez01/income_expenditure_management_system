const makePost = (url: string, body: string, options: any) => {
  const headers = options.headers || {};
  return fetch(url, {
    body,
    headers,
    method: 'POST',
  }).then((res) => {
    if (res.statusText === 'No Content') {
      return res;
    }
    return res.json();
  });
};

const makeJSONPost = (
  url: string,
  data: any,
  options: { headers: { [key: string]: string } }
) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';

  return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
  const url = `https://dev-3rdz760m2026mipo.us.auth0.com/oauth/token`;

  const options = {
    method: 'POST',
    headers: {
      cookie: '',
      'Content-Type': 'application/json',
    },
    body: '{"client_id":"dMAkqVX6n6DO1Qvmu14wshMAqrSTc8Dq","client_secret":"zt04Rf0yD9D0AsIoFmr1M6LcKX5Itxv0Mt7Gi_vSk1mLhVy7oRpkBMBVWct3m-3q","audience":"https://dev-3rdz760m2026mipo.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const res = fetch(url, options).then((response) => {
    if (!response.ok) {
      console.error(
        'Token request failed',
        response.status,
        response.statusText
      );
    }
    return response.json();
  });
  return res;
};

export const createAuth0User = async (
  data: any,
  token: any,
  tokenType: any
) => {
  const url = `https://dev-3rdz760m2026mipo.us.auth0.com/api/v2/users`;
  const headers = {
    Authorization: `${tokenType} ${token}`,
  };
  const body = data;
  return makeJSONPost(url, body, { headers });
};

export const createUser = (data: any) => {
  const url = `/api/auth0`;
  const body = { data };
  return makeJSONPost(url, body, { headers: {} });
};

export const postEmail = (data : any) => {
  const url = `/api/useremail`;
  const headers = {};
  return makeJSONPost(url, data, { headers });
}

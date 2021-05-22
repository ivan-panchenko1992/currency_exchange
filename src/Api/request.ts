import { PostBody } from '../interfaces';

export const request = (url: string) => fetch(url)
  .then((respose) => respose.json()).catch(() => new Error('failed download'));

export const postRequest = (url: string, data: PostBody) => fetch(`${url}/bids`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
})
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));

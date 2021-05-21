import { PostBody } from '../interfaces';

export const request = (url: string) => fetch(url)
  .then((respose) => respose.json()).catch(() => new Error('faild download'));

export const postRequest = (url: string, obj: PostBody) => fetch(`${url}/bids`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj),
});

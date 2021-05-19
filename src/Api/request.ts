export const request = (url: string) => fetch(url)
  .then((respose) => respose.json()).catch(() => new Error('faild download'));

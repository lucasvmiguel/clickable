export const getQueryParamsFromUrl = (url: string): { [key: string]: string } => {
  const query = url.replace(/^[^\?]+\??/, '');
  const vars = query.split("&");
  const args = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    args[pair[0]] = decodeURI(pair[1]).replace(/\+/g, ' ');
  }

  return args
};
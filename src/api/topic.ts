import type { Topic } from 'env';

export const TopicAPI = (locale: string = 'jp') => {
  return fetch(`https://lodestonenews.com/news/topics?locale=${locale}`, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json',
    }),
  }).then<Topic[]>((res: Response) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });
};

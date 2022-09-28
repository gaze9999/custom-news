import type { Topic } from 'env';

export const TopicAPI = async (locale: string = 'jp') => {
  const res = await fetch(
    `https://lodestonenews.com/news/topics?locale=${locale}`,
    {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return await (<Promise<Topic[]>>res.json());
};

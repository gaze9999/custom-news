import type { Main, MainCurrent, Topic } from "@src/types/ffxiv";

export const TopicAPI = async (locale: string = "jp") => {
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

export const MaintenanceAPI = async (locale: string = "jp") => {
  const res = await fetch(
    `https://lodestonenews.com/news/maintenance?locale=${locale}`,
    {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return await (<Promise<Main[]>>res.json());
};
export const MaintenanceCurrentAPI = async (locale: string = "jp") => {
  const res = await fetch(
    `https://na.lodestonenews.com/news/maintenance/current?locale=${locale}`,
    {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return await (<Promise<MainCurrent>>res.json());
};

import type { Main, MainCurrent, Topic } from "@src/types/ffxiv";

const header = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const TopicAPI = async (locale: string = "jp") => {
  const res = await fetch(
    `https://lodestonenews.com/news/topics?locale=${locale}`,
    {
      method: "GET",
      mode: "cors",
      headers: header,
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
      mode: "cors",
      headers: header,
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return await (<Promise<Main[]>>res.json());
};
export const MaintenanceCurrentAPI = async (locale: string = "jp") => {
  const res = await fetch(
    `https://lodestonenews.com/news/maintenance/current?locale=${locale}`,
    {
      method: "GET",
      mode: "cors",
      headers: header,
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return await (<Promise<MainCurrent>>res.json());
};

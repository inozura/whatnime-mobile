const rootUri = "https://api.jikan.moe/v3/top"

interface dataTypeFetched {
  request_hash: string,
  request_cached: boolean,
  request_cache_expiry: number,
  top: Array<{
    mal_id: string,
    rank: number,
    title: string,
    url: string,
    image_url: string,
    type: string,
    start_date: string,
    end_date: string,
    members: string,
    score: number
  }>
}

export const getAnimeUpcoming = async (): Promise<dataTypeFetched> => {
  try {
    const data = await fetch(`${rootUri}/anime/1/upcoming`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getPopularAnime = async () => {
  try {
    const data = await fetch(`${rootUri}/anime/1/bypopularity`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getAnimeAiring = async () => {
  try {
    const data = await fetch(`${rootUri}/anime/1/airing`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getAnimeMovie = async () => {
  try {
    const data = await fetch(`${rootUri}/anime/1/movie`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getTopManga = async () => {
  try {
    const data = await fetch(`${rootUri}/manga/1/manga`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getTopNovels = async () => {
  try {
    const data = await fetch(`${rootUri}/manga/1/novels`)
    return data.json()
  } catch (error) {
    return error
  }
}

export const getListDynamic = async (type: string, subType = 'anime', page = 1) => {
  try {
    const data = await fetch(`${rootUri}/${subType}/${page}/${type}`)
    return data.json()
  } catch (err) {
    return err
  }
}

export const getDetailAnime = async (id: number) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v3/anime/${id}`);
    return data.json();
  } catch (err) {
    return err;
  }
}

export const getDetailManga = async (id: number) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v3/manga/${id}`);
    return data.json();
  } catch (err) {
    return err;
  }
}

export const getCharaStaff = async (id: number) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v3/anime/${id}/characters_staff`);
    return data.json();
  } catch (err) {
    return err;
  }
}

export const getCharacter = async (id: number) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v3/anime/${id}/characters`);
    return data.json();
  } catch (err) {
    return err;
  }
}

export const getSearchAnime = async (keyword: string, page: number = 1) => {
  const key = encodeURI(keyword);
  
  try {
    const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${key}&page=${page}`);
    return data.json();
  } catch (err) {
    return err;
  }
}
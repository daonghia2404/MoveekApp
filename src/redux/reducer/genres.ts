type Action = {
  type: string;
  data: any;
};

const defaultState = async () => {
  await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=6434393eb85c0d17f40be4663df87e11&language=en-US"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const Genres = (state = defaultState(), action: Action) => {
  return state;
};

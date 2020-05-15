type Action = {
  type: string;
  number: number;
};

export const CurrentPage = (state = 1, action: Action) => {
  switch (action.type) {
    case "PAGE_TO":
      return (state = action.number);

    default:
      return state;
  }
};

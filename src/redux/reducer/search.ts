type Action = {
  type: string;
  value: string;
};

export const SearchText = (state = "", action: Action) => {
  switch (action.type) {
    case "SEARCHING":
      return (state = action.value);

    default:
      return state;
  }
};

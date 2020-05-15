export const searching = (value: string) => ({
  type: "SEARCHING",
  value,
});

export const pageTo = (number: number) => ({
  type: "PAGE_TO",
  number,
});

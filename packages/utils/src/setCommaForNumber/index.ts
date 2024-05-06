export const setCommaForNumber = (data: string | number) => {
  const stringConvertedData = typeof data === "number" ? String(data) : data;
  return stringConvertedData?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

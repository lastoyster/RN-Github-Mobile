export const formatNumber = (num: number) => {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
};

export const getCorrectedOffset = (oX: number) => {
  const newOX = oX < 100 ? 0 : Math.round(oX / 100);
  return newOX;
};

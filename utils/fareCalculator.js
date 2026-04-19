module.exports = (distance) => {
  const baseFare = 50;
  const perKm = 10;

  const dist = Number(distance);

  if (isNaN(dist)) {
    throw new Error("Invalid distance");
  }

  return baseFare + dist * perKm;
};
const axios = require("axios");

const getRouteData = async (pickup, drop) => {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup};${drop}?geometries=geojson&overview=full&access_token=${process.env.MAPBOX_KEY}`;

    const res = await axios.get(url);

    const route = res.data.routes[0];

    return {
      distance_km: route.distance / 1000,
      duration_min: route.duration / 60,
      geometry: route.geometry
    };

  } catch (err) {
    console.error(err);
  }
};

module.exports = getRouteData;
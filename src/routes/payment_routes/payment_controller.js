const { courseDB: DB } = require("../../../DB");

const payment = async (req, res) => {
  try {
    res.Response(200, "Working", null);
  } catch {
    res.Response(500, "Payment Failed", null);
  }
};

module.exports = {
  payment,
};

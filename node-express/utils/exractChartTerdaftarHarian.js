const logger = require("../logger/logger");

const fs = require("fs");

module.exports = async () => {
  try {
    var daftarHarian = fs.readFileSync(
      `./public/dataChart/chartTerdaftarHarian.txt`,
      {
        encoding: "utf8",
      }
    );

    var fields = daftarHarian.split("~");
    var daftarHarianMf = fields[0];
    var totaldaftarHarianMf = fields[1];
    var daftarAplikasiMf = fields[2];
    var daftarHarianOs = fields[3];
    var totaldaftarHarianOs = fields[4];
    var daftarAplikasiOs = fields[5];
    var last_Sync_terdaftar = fields[6];

    return [
      daftarHarianMf,
      totaldaftarHarianMf,
      daftarAplikasiMf,
      daftarHarianOs,
      totaldaftarHarianOs,
      daftarAplikasiOs,
      last_Sync_terdaftar,
    ];
  } catch (err) {
    logger.error(`[ERROR] ${err}`);
  }
};

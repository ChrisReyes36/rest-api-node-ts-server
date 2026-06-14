import database from "../config/database";

const clearDB = async () => {
  try {
    await database.sync({ force: true });
    console.log("Datos eliminados correctamente");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

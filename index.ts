import { sequelize } from "./src/db";
import config from "./lib/config";

const PORT = config.port;
const NAME = config.dbName;
import app from "./src/app";

sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    app.listen(PORT, function () {
      console.log(`App is listening on port ${PORT}! name DB ${NAME}!`);
    });
  })
  .catch((err) => console.error(err));

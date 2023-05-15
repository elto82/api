import { sequelize } from "./src/db";
import config from "./lib/config";

const port = config.port;
const NAME = config.dbName;
import app from "./src/app";

sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    const port = parseInt(process.env.PORT, 10) || 3000;

    app.listen(port, "0.0.0.0", function () {
      console.log(`App is listening on port ${port}! name DB ${NAME}!`);
    });
  })
  .catch((err) => console.error(err));

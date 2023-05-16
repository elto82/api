import { sequelize } from "./src/db";
import config from "./lib/config";
import app from "./src/app";

const NAME = config.dbName;
const port = parseInt(process.env.PORT, 10) || 3000;

sequelize
  .sync({ force: true, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    app.listen(port, async function () {
      console.log(`App is listening on port ${port}! name DB ${NAME}!`);
    });
  })
  .catch((err) => console.error(err));

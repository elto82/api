import { sequelize } from "./src/db";
import config from "./lib/config";
import app from "./src/app";

import { countBroker } from "./jsonBrokerCorreo";

const { Broker } = sequelize.models;
const NAME = config.dbName;
const port = parseInt(process.env.PORT, 10) || 3000;

sequelize
  .sync({ force: false, logging: false })
  .then(async () => {
    console.log("base de datos conectada! :D");
    //cargar unos usuarios de broker para prueba
    await Broker.bulkCreate(countBroker);
    app.listen(port, async function () {
      console.log(`App is listening on port ${port}! name DB ${NAME}!`);
    });
  })
  .catch((err) => console.error(err));

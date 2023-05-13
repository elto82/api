import { sequelize } from "./src/db";
require("dotenv").config();
const PORT = process.env.API_PORT || 3001;
import app from "./src/app";

sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    app.listen(PORT, function () {
      console.log("App is listening on port :" + PORT);
    });
  })
  .catch((err) => console.error(err));

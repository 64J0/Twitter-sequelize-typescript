import express from "express";
import cors from "cors";

import routes from "./routes";
import PostgresDB from "./database";

async function init() {
  const app = express();

  app.use(cors({}));
  app.use(express.json());
  app.use(routes);

  const port = process.env.PORT || 3000;
  const postgres = new PostgresDB();
  let retries = 5;
  while (retries > 0) {
    try {
      await postgres.connection.authenticate();
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      break;
    } catch (error) {
      retries -= 1;
      console.log(`retries left: ${retries}`);
      console.error(error);
      // wait 5 s
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

init();

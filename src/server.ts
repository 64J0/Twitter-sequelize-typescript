import express from "express";
import cors from "cors";

import routes from "./routes";
import PostgresDB from "./database";

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);

new PostgresDB()
  .connection
  .authenticate()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("PostgresDB connection failed", err);
  });

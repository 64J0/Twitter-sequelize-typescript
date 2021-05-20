import express from "express";
import cors from "cors";

import PostgresDB from "./database";
import routes from "./routes";

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);

PostgresDB
  .connection
  .authenticate()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Server starting error", err);
  });

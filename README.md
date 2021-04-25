# Twitter clone back-end

This project will be a simplified twitter back-end clone implemented with Postgres as the database option. The main goal is to study more concepts of SQL with sequelize as the ORM and typescript as the language.

* Postgres is running with Docker in my local machine, maybe later I'll make a dockerfile to automate the process of starting the project even with the database.

### Useful commands:

```bash
# DATABASE:
#
# Create migration file:
npx sequelize migration:create --name=<given_name>

# Apply the migrations automatically:
npx sequelize db:migrate

# Revert last migration:
npx sequelize db:migrate:undo

# ///////////////////////////
# SERVER:
#
# Build the application (transpile ts -> js):
npm run build

# Start transpiled application:
npm start

# Start application in dev environment:
npm run dev

# ///////////////////////////
# DOCKER:
#
# Build the image locally:
docker build . -t <your username>/twitter-sql-ts

# Run the image:
docker run -p 49160:8080 -d <your username>/twitter-sql-ts

# Remove image:
docker rmi <image_id>

# Remove container:
docker rm <container_id>
```

### References:

[1] - https://www.hiredintech.com/classrooms/system-design/lesson/67

[2] - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ -> For Dockerfile

[3] - https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt -> For Dockerfile

[4] - https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize

---

2021, Vinícius Gajo Marques Oliveira
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
```

### References:

[1] - https://www.hiredintech.com/classrooms/system-design/lesson/67

---

2021, Vinícius Gajo Marques Oliveira
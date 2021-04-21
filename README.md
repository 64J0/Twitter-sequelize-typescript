# Twitter clone back-end

This project will be a twitter back-end clone implemented with Postgres as the database option. The main goal is to study more concepts of SQL with sequelize and typescript.

* Postgres is running with Docker in my local machine.

### Useful commands:

```bash
# Create migration file:
npx sequelize migration:create --name=<given_name>

# Apply the migrations automatically:
npx sequelize db:migrate

# Revert last migration:
npx sequelize db:migrate:undo
```

---

2021, Vinícius Gajo Marques Oliveira
# MySQL - Local Setup Guide

## Prerequisites

- **MySQL 8.2** - Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

## Installation

1. Install MySQL Server 8.2 following the installer instructions
2. Set the root password to `root` (or change it in the application.properties)
3. Start the MySQL service

## Create the Database

Connect to MySQL and run:

```sql
CREATE SCHEMA `valsoft_library` DEFAULT CHARACTER SET utf8;
```

Or via command line:

```bash
mysql -u root -p -e "CREATE SCHEMA valsoft_library DEFAULT CHARACTER SET utf8;"
```

## Verify

```bash
mysql -u root -p -e "SHOW DATABASES;"
```

You should see `valsoft_library` in the list.

## Notes

- The database tables will be automatically created by **Flyway** when the Java backend starts
- Default connection: `localhost:3306` with user `root` / password `root`
- For Docker, MySQL runs on port `33306` externally (mapped from `3306` inside the container)
- The Flyway migrations are located at: `back_end_javaspringboot/src/main/resources/db/migration/`

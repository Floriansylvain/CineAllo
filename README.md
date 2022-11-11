# CineAllo
## Setup
### Env file
- DATABASE_URL
- MYSQL_DATABASE
- MYSQL_ROOT_PASSWORD
- CINEALLO_PORT

``DATABASE_URL`` shoud look like this:
```html
mysql://root:<MYSQL_ROOT_PASSWORD>@db:3306/<MYSQL_DATABASE>
```
## Usage
### Docker
```bash
docker-compose up --build
```
### From scratch
You'll need your own MySql DB running.
```bash
npm ci
```
```bash
npm run start
```
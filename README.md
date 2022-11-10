# CineAllo
## Setup
### Env file
- DATABASE_URL
- MYSQL_ROOT_PASSWORD
- CINEALLO_PORT
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
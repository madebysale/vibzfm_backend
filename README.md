### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create new database 
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=express-sequelize-api   # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port
```


### Migration and Seeders run
After creating database and updating .env file run below commands
```
> npx sequelize-cli db:migrate
> npx sequelize-cli db:seed:all
```
Migration will create table and seed some default

`npm start` to run your project 
>Everythig is setup and you are good to go now. Happy Coding :)


## APIs

### Register
```
> POST : http:localhost:3000/api/public/register   
> Payload: 
{
    "firstName" : "parvez",
    "lastName": "khan",
    "phoneNumber":"9876543210",
    "gender":"male",
    "dob":"1999-09-09"
}

> Response : 
{
    "code": 200,
    "data": {
        "id": 1,
        "firstName": "parvez",
        "lastName": "khan",
        "phoneNumber": "9876543210",
        "gender": "male",
        "dob": "1999-09-09",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwicGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwIiwiY3JlYXRlZEF0IjoiMjAyMS0xMC0xM1QxMzowODo1NS45NTVaIn0sImlhdCI6MTYzNDEzMDUzNX0.YhI8NL2LMvSbO-oZzCxpemwgcr_FWyADFMOm1Y-mQQ8"
    },
    "success": true
}
```


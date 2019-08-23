## RESTful BackendAPI using Node.js, PostgreSQL and JWT
With this API, you should be able to signup, login, modify and get user info. I used Postman for the testing of APIs. 
However, you can really use any API development tools. You can download the free version of Postman here: https://www.getpostman.com/downloads/ 

### Installation
``` javascript
git clone https://github.com/inquisitiv-e/BackendAPI.git
cd BackendAPI

npm install --save express nodemon
brew install postgresql
brew services start postgresql
```
### Create new database
```javascript
psql
CREATE DATABASE tests;
```
### Migrate knex table onto the database
```javascript
knex migrate:latest
```
### Launch
```javascript
npm run dev
```
### `POST /signup`
This is the endpoint to create new user.

```javascript
curl --data "email=test@gmail.com&password=test&firstName=Erica&lastName=C"  http://localhost:3000/signup
```

The response body will return a JWT on success that can be used for other endpoints:

```javacript
{
  "token": "{the_token}"
}
```

### `POST /login`
This is the endpoint to sign in a user.

```javascript
curl --data "email=test@gmail.com&password=test"  http://localhost:3000/login
```

The response body will return a JWT on success that can be used for other endpoints:

```javacript
{
  "token": "{the_token}"
}
```

### `GET /users`
Endpoint to retrieve a json of all users. This endpoint requires a valid `x-authentication-token` header to be passed in with the request.

```javascript
curl -H 'Accept: application/json' -H "Authorization: Bearer {the_token}" http://localhost:3000/users
```

The response body should look like:
```json
{
    "users":
    [
      {
        "id": 9,
        "email": "test@gmail.com",
        "firstName": "Erica",
        "lastName": "C",
        "password_digest": "$2b$12$Z1DseLUz8/RuACmgti6shukytrtTMG9vP2572JfwUVpYI6UvP9X5m"
      }
    ]
}
```

### `PUT /users`
Endpoint to update the current user `firstName` or `lastName` only. This endpoint requires a valid `x-authentication-token` header to be passed in and it should only update the user of the JWT being passed in.

```javascript
curl -H 'Accept: application/json' -H "Authorization: Bearer {the_token}" --request PUT -d "firstName=NewFirstName" -d "lastName=NewLastName" http://localhost:3000/users
```
The response body will be empty. 

What was the hardest part?
> The most challenging part was to set up a database for the api. 

Did you learn anything new?
> It was my first time using PostgreSQL as the database and using jwt for verification, so I definitely learned something new!

Is there anything you would have liked to implement but didn't have the time to?
> I would have liked to implement delete user as well. Also, I would have liked to add test-suites to see if I missed any error-handling.

What are the security holes (if any) in your system? If there are any, how would you fix them?
> Right now the JWT header is the only way the user can be verified. I could see how easily the encrypted keys can get cracked and be used by someone else. My best guess would be to implement a secondary system that would validate the user again, although I'm not exactly sure how it can be implemented. Again, that could be something else for me to learn about! 



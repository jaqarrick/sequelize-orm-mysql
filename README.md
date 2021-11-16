# Sequelize Course

Following along [this course](https://github.com/DavidArmendariz/sequelize-course).
## JWT (JSON Web Token)
Since this is an authentication backend, we need a reliable auth method. 

JWTs defines a compact and self-contained way for securely transmitting data between parties as a JSON object. Used heavily in **authorization** and **information exchange**. 

### JWT Structure
JWTs consist of three parts (separated by dots `.`):
- Header
- Payload
- Signature
```xxxxx.yyyyy.zzzzz`

1. Header
```
{
    "alg": "HS256",
    "typ": "JWT"
}
```
2. Payload
Contains _claims_ (statement about an entity, typically the user), for example:
- `iss` - issuer
- `exp` - expiration time
- `sub` - subject
- `aud` - audience

There are _public claims_ which can be defined at will, but must be _collision resistant_ i.e. needs to be unique

```
{
    "sub": "1234456",
    "name": "John Doe",
    "admin": true
}
```

Both the header and payload are converted into base64. 

3. Signature
To create the signature, you pass the encoded header and payload, as well as a secret into the encryption algo - then sign that. 

### How to JSON Web Tokens Work?
Any time a user succesfully logs in, a JSON web token will be returned. Since tokens are credentials, we don't want them to be compromised. This is where the `exp` comes in. 

When a user wants to access a protected route/resource, they will send the JWT, typically in the **Authorization** header using the **Bearer** Schema:
```
Authorization: Bearer <token>
```

## Models
This app defines three models 
1. User
Users will have many roles (1 to many relationship), one refresh token, and several properties like email, username, password, firstName, lastName
2. Role
Roles belong to _User_ and will have one property, _role_
3. Refresh Token
Belong to a user, and one property. 

All of these models are abstracted with sequelize


## Migrations
Allow a record of transactions. 


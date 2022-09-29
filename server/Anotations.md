# routes name

Use routes in plural, ex: /games, /ads, /users, etc...

# Params

Query: Come after ? symbol. Used to persist the state.
Persisting state? It's like a filter, order, pagination, etc...
Ex: localhost:3333/ads?page=2&sort=title

Route: Used with identity.
Ex: localhost:3333/post/how-to-create-a-api-rest <---- how-to-create-a-api-rest is the route param.

Body: Send many informations like a form.

# Installing ORMS

**Install ORMS in development dependicies**

# Prisma

You can click with right-click on schema.prisma, and use format Document if it doesn't format on save after inserting some relation between 2 schemas.

Ex: 
model User {
  id        String @id
  nickname  String
  password  String
}

model Post {
  id              String   @id
  title String
  text  String
  user User <---- This line is very important. 1 post have 1 user, and 1 user can have a lot of posts.
}

If you save and format this document, it gonna already create the relation. c:

## npm i @prisma/client

This dependency is required to use connect our API to database.

# Structure

## utils folder

Can create functions inside utils folder to convert some data, like datas, timestamps, etc...


# Assignment AntarticaGlobal -> Ankit Raj

#### how to run
* clone the project and navigate inside
* run `npm i`
* run `npm start`
* navigate to `http://localhost:4000/graphql` and you will see the GraphQli Playground and start executing the graphql command wirtten below

#### Server made with
* SqlLite
* GraphQL
* Bycrypt
* jsonwebtoken

#### Folder Structure
 * EntryFile -> index.js
 * AuthFile -> auth_jwt.js
 * sample to insert in DB -> insert.js
 * environment variable -> .env
 
#### Things to note
* In GraphQL
 ** source is on what feild you want to sort data i.e. `firstName`, `lastName`, `emailID`, `employeeID`, `orgName`
 ** search field in `getEmployeebytext` will display the data present on either `firstName`, `lastName`, `employeeID`
 ** in `getEmployeebytext`, `getEmployee` Passing token and pageno is mandatory
 

#### GraphQL Queries and Mutation
```sh
# for register
mutation{
  register(employeeID:"p1",emailID:"p@gmail.com",password:"password@p",firstName:"p",lastName:"r",orgName:"test-p"){
    id
    employeeID
    firstName
    lastName
    emailID
    orgName
    errorCode
  }
}

# for login
query{
  login(emailID:"b@gmail.com",password:"password@b"){
    emailID
    token
    tokenExpiration
    errorCode
  }
}

# for Search Employeebytext
query{
  getEmployeebytext(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElEIjoicEBnbWFpbC5jb20iLCJpYXQiOjE2MTM4MjgxNDMsImV4cCI6MTYxMzgzMTc0M30.fQS0ICrTUq_5sAq13Y6TQA1i1DXlF8Wz6fP8eefOxw4",searchText:"a",pageno:0){
    emailID
    employeeID
    firstName
    lastName
    orgName
    errorCode
  }
}

# for Search all Employee
query{
  getEmployee(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElEIjoicEBnbWFpbC5jb20iLCJpYXQiOjE2MTM4MjgxNDMsImV4cCI6MTYxMzgzMTc0M30.fQS0ICrTUq_5sAq13Y6TQA1i1DXlF8Wz6fP8eefOxw4",pageno:0){
    emailID
    employeeID
    firstName
    lastName
    orgName
    errorCode
  }
}

# for Search all Employee but sort aq to source
query{
  getEmployee(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElEIjoicEBnbWFpbC5jb20iLCJpYXQiOjE2MTM4MjgxNDMsImV4cCI6MTYxMzgzMTc0M30.fQS0ICrTUq_5sAq13Y6TQA1i1DXlF8Wz6fP8eefOxw4",source:"firstName",pageno:0){
    emailID
    employeeID
    firstName
    lastName
    orgName
    errorCode
  }
}


```
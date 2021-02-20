const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

const bcrypt = require('bcrypt');

//jwt token
const auth = require("./auth_jwt");

const app = express();
const database = new sqlite3.Database("./db.db");

const saltRounds = Math.floor(Math.random() * 7) + 5;

const createContactTable = () => {
  const user = `
        CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY,
        emailID text UNIQUE,
        password text
        )`;
  const employee = `
        CREATE TABLE IF NOT EXISTS employee (
        id integer PRIMARY KEY,
        emailID text UNIQUE,
        employeeID text,
        firstName text,
        lastName text,
        orgName text
        )`;
  database.run(user);
  database.run(employee);
};

createContactTable();

const schema = graphql.buildSchema(`
type Query{

  getEmployee (token: String! source: String pageno: Int!): [Employee]

  getEmployeebytext (token: String! searchText: String! pageno: Int!): [Employee]

  login (emailID: String! password: String!): Authdata!
}

type Mutation {

  register(
    employeeID: String!
    firstName: String!
    lastName: String!
    emailID: String!
    password: String!
    orgName: String!) : Employee

}

type Authdata{
  emailID: String
  token: String
  tokenExpiration: Int
  errorCode: Int!
}

type status {
  code: Int!
  message: String!
}

type Employee{
  id: Int
  employeeID: String
  firstName: String
  lastName: String
  emailID: String
  orgName: String
  errorCode: Int
}
`);

const root = {
  //return all employee
  getEmployee: ({ token, source, pageno }) => {
    return new Promise((resolve, reject) => {
      if (source != undefined) {
        database.all(
          `SELECT * FROM employee ORDER BY ${source} ASC limit 10 offset ${pageno} * 10;`,
          function (err, rows) {
            if (err) {
              reject(err);
            } else {
              const token_emailID = auth.verifyToken(token);
              if (token_emailID == false) {
                resolve([{ errorCode: 1 }]);
              } else {
                //if all quth is fine
                resolve(rows);
              }
            }
          }
        );
      } else {
        database.all(
          `SELECT * FROM employee limit 10 offset ${pageno} * 10;`,
          function (err, rows) {
            if (err) {
              reject(err);
            } else {
              const token_emailID = auth.verifyToken(token);
              if (token_emailID == false) {
                resolve([{ errorCode: 1 }]);
              } else {
                //if all quth is fine
                resolve(rows);
              }
            }
          }
        );
      }
    });
  },

  //return employee by its searchText and pageno
  getEmployeebytext: ({ token, searchText, pageno }) => {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM employee WHERE employeeID LIKE "%${searchText}%" or firstName LIKE "%${searchText}%" or lastName LIKE "%${searchText}%" limit 10 offset ${
          pageno * 10
        };`,
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            const token_emailID = auth.verifyToken(token);
            if (token_emailID == false) {
              resolve([{ errorCode: 1 }]);
            } else {
              //if all quth is fine
              resolve(rows);
            }
          }
        }
      );
    });
  },

  //login
  login: ({ emailID, password }) => {
    return new Promise((resolve, reject) => {
      database.get(
        `SELECT * FROM user WHERE emailID = "${emailID}";`,
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            if (!rows) {
              //if email not found
              resolve({ errorCode: 1 });
            } else {
              //if email found
              database.get(
                `SELECT password as pwd FROM user WHERE emailID = "${emailID}";`,
                function (err, rows) {
                  if (err) {
                    reject(err);
                  } else {
                    const pwd_check = bcrypt.compareSync(password, rows.pwd);
                    if (pwd_check==false) {
                      //if password not matched
                      resolve({ errorCode: 2 });
                    } else {
                      //password matched
                      // const token_enrno = auth.verifyToken(req, res, next);
                      auth.getToken(emailID).then((token) => {
                        resolve({
                          emailID: emailID,
                          token: token,
                          tokenExpiration: 1,
                          errorCode: 0,
                        });
                      });
                    }
                  }
                }
              );
            }
          }
        }
      );
    });
  },

  //create new employee
  register: ({
    employeeID,
    firstName,
    lastName,
    emailID,
    password,
    orgName,
  }) => {
    return new Promise((resolve, reject) => {
      //
      const hashpw = bcrypt.hashSync(password, saltRounds);
      database.run(
        "INSERT INTO user (emailID,password) VALUES (?,?);",
        [emailID, hashpw],
        (err) => {
          if (err) {
            reject(err);
          }
          database.get("SELECT last_insert_rowid() as id", (err, rows) => {
            database.run(
              "INSERT INTO employee (emailID,employeeID,firstName,lastName,orgName) VALUES (?,?,?,?,?);",
              [emailID, employeeID, firstName, lastName, orgName],
              (err) => {
                if (err) {
                  reject(err);
                }
              }
            );

            resolve({
              id: rows["id"],
              employeeID: employeeID,
              firstName: firstName,
              lastName: lastName,
              emailID: emailID,
              orgName: orgName,
            });
          });
        }
      );
      //
    });
  },

  //delete the previous employee
  //deleteEmployee(id: Int!) : String <------mutation
  // deleteEmployee: ({ id }) => {
  //   return new Promise((resolve, reject) => {
  //     database.run("DELETE from employee WHERE id = (?);", [id], (err) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(`Contact #${id} deleted`);
  //     });
  //   });
  // },

  //
};

app.use(
  "/graphql",
  graphqlHTTP({ schema: schema, rootValue: root, graphiql: true })
);
app.post(
  "/graphql",
  graphqlHTTP({ schema: schema, rootValue: root, graphiql: false })
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000.");
});

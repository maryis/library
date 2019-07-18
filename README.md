# library
an online library API using nodejs(express,mongoose)

    login (login )
    user (add, change, delete, get all, get one)
    book (add, edit ,remove , getrate ,add author, add comment)
    buy(or transaction) (add )

sample request body:

login :   http://localhost:3000/login

{
   	"username" : "ali",
    "password" : "123456",
  }
----------------
  
 add user: (jwt)   http://localhost:3000/user/
 {
   	"username" : "ali",
    "password" : "123456",
    "contact" : { "address":"karimkhan",
                "email": "m@c.com"},
    "isAdmin": "true"}

----------------------------
add book: (jwt)  http://localhost:3000/book/

 {   "ISBN" : "sdfsdf",
    "title" : "HILIFE",
    
    "authors" : [{ "name":"ali",
                "family":"javadi"}],
 }
---------------------
add comment: (jwt) http://localhost:3000/book/addcomment/:id
 {
    "comments" : [{ "rate":7},{ "rate":2}]
 }
-------------------
add author: (jwt)  http://localhost:3000/book/addauthor/:id
{
    "authors" : [{ "name":"ali",
                "family":"javadi"}],
 }
-------------------
buy a book: (jwt)  http://localhost:3000/buy
 {
    "trans_time": "2019/01/01",
    "customer":ObjectId("5d26ef12440730206c06f305"),
    "books":[{"bookId":"5d281e05fa75591ef88b6cb7","quantity":2}]
 }

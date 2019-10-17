# general knowledge about nodejs:
Nodejs: on v8 (chrome js engine)
To install nodejs:
-	Install nvm: a simple script that should be run in cmd, and it helps to install and have multiple nodejs on one system
-	Nvm –version  
-	Nvm install 10.15.0 (check the lt’s version in nodejs.org
-	Nvm use version-no
-   change port in bin/www

To install express:
-	Npm install express-generator  -g
-	Express –view=pug   myapp  (create an express app structure with pug as html template engine)
-	Cd myapp
-	Npm install (install packages listed in package.json)	
-	DEBUG=myapp: * npm start
-	Sublime .  (open sublime as text editor )

Routing:
-	http://ww.f.com/kl/ph
o	http:   protocole
o	www.f.com   : domain
o	Kl/ph   : path 

Nodemon: (to watch changes and recompile…)
-	Npm install nodemon –save-dev (means it’s a dep in development env)
-	Modify start script in package.json from node to nodemon

ORMs: 
-	sequelize : for postgresql, mssql, mysql..  
-	mongoose: for mongo
-	….
-	Steps:  
o	Npm install orm
o	Npm install driver

#mongoose
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()

- note that by save mongo generate _id as id, so findById is not useful for me

# library
- an online library API using nodejs(express,mongoose)

    - login (login )
    - user (add, change, delete, get all, get one)
    - book (add, edit ,remove , getrate ,add author, add comment)
    - buy(or transaction) (add )

- its doc as a postman-collection file exist in this project folder and we can import and call each API
(note that auth header is disabled where it is not needed)
# ByteSquad
Team project: Advanced Bucket List

Team members and roles (to be refined further):  
Frontend:  
Alexandra- Frontend  
Oana- Frontend  
Stefana- Frontend  
András - Frontend  

Backend:  
Marius- Backend/QA

Full-stack:  
Andreea- Backend(/Frontend) - Project Manager  
Antonia- Backend(/Frontend)  
Briana- Backend(/Frontend)  
Dayana- Backend(/Frontend)  
Remus- Frontend(/Backend)  
*the role written outside the parenthesis are the ones which the developers will focus more on

Components:  
backend:  
It represents the backend side of the application. It launches by default on http://localhost:8080/ .  
It was created using IntelliJ IDEA Ultimate (2022.2.2). It is written in Java + Spring Boot, and has the following properties:  
Spring Boot: 3.1.5  
JDK: Oracle OpenJDK 19.0.2  
Java: 21  
Dependencies:  
Spring Web  
Lombok  
Sprind Data JPA  
MySQL Driver  
H2 Database

frontend:  
It represents the view of the application which launches by default on http://localhost:5173/ . It uses Vite 4.5.0 + React. In order to run it you need the following:  
Node.js 20.9.0: https://nodejs.org/en  
Visual Studio Code (or any other code editor, preferably one which can open a terminal inside it): https://code.visualstudio.com/  
Once you clone the repository, in order to run the project you need to type the following command in the terminal:  
npm install  
npm run dev  

DB:  
The database where we store our users, their bucket lists and destinations. It is written in PostgreSQL using pgAdmin4 (v15). Its structure is attached below.  
In order to use it in your project, you need to do the following (Here is a tutorial on how do it in case you do not want to read :) https://www.youtube.com/watch?v=3AKIA8pu8YY):  
install pgAdmin4 (https://www.pgadmin.org/download/pgadmin-4-windows/) and start it  
on the left side, in the 'Browser' list select the default Server (or create one if there is none)  
create a Database by right clicking on the 'Database' drop-down and clicking 'Create'->'Database'  
IMPORTANT: name it: BucketListDB  
right click on the 'BucketListDB', click on 'Restore'  
click on 'Filename' file icon and select the file from the DB repository file (./DB) named 'ByteSquadDB.sql'
click on the 'Restore' button  
You might be required an user and/or password to access the DB. The username and password are both: postgres  
In case there are problems, I also attached the script for it, so you can manually create it. By default, pgAdmin4 runs its server on jdbc:postgresql://localhost:5432/[SERVER_NAME]  
![DB_Diagram](https://github.com/917tapoimarius/ByteSquad/assets/91742424/6bca8526-3bbe-4e27-aac6-d7f0a83523a8)


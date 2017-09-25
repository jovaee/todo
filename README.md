# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
T1: Added endpoint that takes index of the updating todo as well as the new text in the body of the request

T2: To run the tests use `npm test`

T3: Use `docker build -t todo -f Dockerfile .` to build the docker. Use `docker run todo -p 8080:8080` to run the docker image and expose port 8080 for usage. This will start the server.

B1: Is shown after `npm test` has been run.

B2: The vulnerability is the injection of code into the web page. Escaping characters, `clean()`, before inserting them into the HTML prevents injection of malicious code for example `<script>` elements.


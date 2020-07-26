## React audio transcript

- A demo can be found at [react-audio-transcript-demo](https://react-audio-transcript.herokuapp.com/)
- Built with react and redux and tailwindcss

### Running locally

- Clone and change directory (`cd react-audio`) to the repository
- Tun the commands `npm i && npm run install-client` to install all the dependancies (both server and client side dependancies)
- To start the setup issue the command `npm run dev`, this starts a nodejs server at `localhost:8080` and react client at `localhost:3000`
- The server part is optional in local environment as we dont have any api setup yet, however this is essential while hosting to heroku. The express server serves the react production build
- If you wish to run only the react-client run `npm run client` from the root of the project directory.

### Notes on hosting to heroku

- Requires the express server, as this will serve the react production build content and apis in future
- Hosting on heroku also requires `npm run heroku-postbuild`, this build the client to be served by the express server

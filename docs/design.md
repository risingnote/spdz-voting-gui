## Workshop voting MPC demonstrator

High level design message flows for SPDZ MPC Demonstrator 

![crypto logo](./voting-demo-hld.png)

### Application Server

Provides services to clients who wish to take part in the workshop voting demonstrator. It acts as:

- an entry point for the application, serving the client GUI,
- a user registration service to allow users to acquire their voting id (optional feature),
- a results server to offload reading results directly from the SPDZ engines.

Will most likely be implemented as a node.js server running express and providing rest endpoints to the client:

- `/` *access voting GUI*
- `/register` register a user email with a voting id
- `/results` read for the latest results, likely a sockets interface to push updates.

The data exchanges for the application server is:

***AS0*** At startup load the voter id and talks data. As clients register update the voter id with the client email (optional).


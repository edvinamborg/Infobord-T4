## Project Vision

For our project, we plan to leverage MongoDB Atlas as a user-friendly and
maintainable database solution. Opting for NoSQL eliminates the need for manual
downloading and configuration associated with traditional SQL databases.

On the frontend, we'll utilize React for its dynamic rendering capabilities. By
creating a single HTML document, React can dynamically render the appropriate
information based on the data received.

Handling requests will be facilitated by Node.js. The process involves an tablet
scanning an ID, which is then used to initiate a GET request for the
corresponding JSON file. This JSON file will later be rendered by React. While
the mechanism for the tablet to communicate with our backend and trigger the
retrieval and rendering process is not fully defined, we are exploring
efficient solutions for this interaction.

First idea from tablet scan to rendering of page:

1. tablet scan even: Event occurs when NFC/RFID card is scanned using tablet
		
2. React Component: React is waiting for the scan event.
		
3. Trigger handleScan: scan event triggers the handleScan function in the react
   component.
		
4. POST request to Backend: handleScan initiates a POST request to the Nodejs
   Backend, handling the scanned ID 
		
5. Nodejs Backend: Backend receives the POST request on the the "/api/scans"
   endpoint
		
6. Database Query: Backend queries the MongoDB database to retrieve information
   about the figurine.
		
7. JSON Response: Backend send a JSON response containing information about the
   figurine.
		
8. React Component: React receives the JSON response and updates the UI to
   display the figurine information.





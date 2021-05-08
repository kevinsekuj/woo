# woo

[woosta.org](www.woosta.org) 

A full stack web application serving as a message board for tourist sites and locations in Worcester, MA. Users may submit posts with images and reviews, leave reviews and ratings, and view the locations in real-time via Google Maps API integration.


<em>note: this site is currently optimized for 1080+ resolutions</em>


## Demo

![Demo](/img/reduced.gif)

## Features

- Full read, create, update, and delete functionality for posts, and creation/deletion for reviews
- Multi-image upload and Maps API integration on each created post, including star reviews 
- Authentication with Passport.js, client and server side error handling using Express middleware and Joi
- Templates rendered from the server-side with embedded JavaScript templating

## Technologies

- [Node.js](https://nodejs.org/en/) 
- [Express.js](https://expressjs.com/) 
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [ejs](https://ejs.co/)
- [Bulma](https://bulma.io/)
- JavaScript
- CSS

## Development

This web application uses a Node-Express back-end integrated with MongoDB, and features full CRUD functionality for location submissions. A separate model exists for reviews and users which are referenced in the location model. The back-end routes are separated into controllers which handle submission creation, authentication and authorization via Passport.js, Google Maps API calls, as well as login via Express session. 

Images are uploaded to cloudinary for cloud-based image hosting, with the multer middleware for multipart form data, specifically, multiple image upload.  Express Middlewares were developed along with Joi for both client and server side error handling, such as invalid form data or submitting invalid post requests. 

Templates are served from the back-end via Embedded JavaScript Templating, which include Express flash to send custom success or error messages to the user. 

## License

MIT

# Homebnb

<a name="readme-top"></a>

Check out a live version of Homebnb here:
[Homebnb][render-url]

[render-url]: https://ruidan-zhang-homebnb.onrender.com

HomeBnB is a web application inspired by Airbnb, that provides an online marketplace for lodging, primarily hoemstays for vacation rentals, and tourism activies.

## Technologies Used
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-CA4245?style=for-the-badge)](https://www.sqlalchemy.org/)
[![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)



## Features:
### Landing page
![home-page-demo-user]

[home-page-demo-user]: ./assets/landing-page.png

## Spots
![posts]

[posts]: ./assets/spot-details.png

## Reviews
![comments]

[comments]: ./assets/reviews.png

## Booking
![booking]

[booking]: ./assets/booking.png

## Getting started
1. Clone this repository

2. Respectively ```cd``` into the backend folder and the frontend foloder and install dependencies
      ```
      npm install
      ```

3. Run migration and seeders in the backend folder
      ```
      npx dotenv sequelize db:migrate
      npx dotenv sequelize db:seed:all
      ```

4. Respectively start the backend server and the front server
      ```
      npm start
      ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->

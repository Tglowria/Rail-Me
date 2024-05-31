# Rail-Me App

## Overview
Rail-Me is a train service provider that commutes people from the Abeokuta region to the Northern part of Nigeria. The management decided to switch from the conventional paper booking system to a digitized one without causing any business downtime. This document provides an overview of the application and the various endpoints built for the users (commuters) and admins.

## Features

### Users (Commuters)
1. **Sign Up**: Users can sign up with their phone number, email, first name, last name, and password.
2. **Send OTP**: An endpoint to send a One-Time Password (OTP) to the user’s phone number and email.
3. **Password Reset**: Users can request to reset their password if forgotten.
4. **Login**: Users can log in using their email address and password.
5. **Book Train Seat**: Users can book a train seat.
6. **Edit Booking**: Users can edit their booking time.
7. **Cancel Booking**: Users can delete (cancel) their booking.
8. **View Services**: Users can view all services provided by the train station, including Reservation, Business, and Economy classes.

### Admin
1. **View Users**: Admins can see all registered commuters.
2. **Upload Reservations**: Admins can upload new reservations for commuters to book, including adding pictures of the types of trains and coaches.
3. **View Bookings**: Admins can view the total number of bookings done on the platform.

## Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/rail-me.git
2. Install Dependencies:
   npm install
3. Set Up Environment Variables:
   Create an `.env` file in the root directory and your dependencies.
4. Start the application:
   npm start

## Technologies Used
1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. Cloudinary (for image uploads)
6. Multer (for handling file uploads)

## Postman Documentation
[Postman Link]()

I’m currently learning **back end web development** and a student at **At GRAZAC ACADEMY**

   
     

# Angular-Project

The application enables users to search for, view, and save information about artists and artworks by integrating with the Artsy API. It provides user authentication, personalized features (such as managing favorites), and a responsive, interactive user interface.
# Pages
1. Search Page

Users are greeted with a search bar to find artists or artworks.Real-time search suggestions and results are fetched from the Artsy API as the user types.

Search results display artist names, artwork thumbnails, and brief details.

2. Artist Detail Page

Clicking on an artist in the search results navigates to a detailed artist profile.

Displays comprehensive information: artist bio, nationality, birth/death years, and a gallery of related artworks.Loggeg in users can add the artist to their favorites.

3. Artwork Detail Page

Shows detailed information about a selected artwork, including title, year, medium, dimensions, and images.

4. User Authentication Pages

Registration: New users can sign up with email and password.

Login: Existing users can log in; authentication is managed with JWT and cookies.

5. Favorites Page

Authenticated users can view and manage their list of favorite artists and artworks. Provides quick navigation to detailed pages for each favorite.

6. Responsive Navigation

The site features a responsive navbar for easy access to search, favorites, and profile pages across devices.

# Backend and Data Handling

1. Node.js/Express Server

Handles all RESTful API requests from the frontend. Manages user authentication, session management, and secure communication with the Artsy API.

2. MongoDB 

Stores user data and favorites in MongoDB Atlas for persistence and scalability.

2. API Integration

Utilizes the Artsy API for real-time artist and artwork data, ensuring up-to-date content.

# Frontend Technologies

1. Angular & Bootstrap

Delivers a modern, mobile-first UI with dynamic content rendering and interactive components. Uses Angular’s HttpClientModule for AJAX calls to the backend and Artsy API.

# Cloud Deployment

The application is deployed on Google Cloud Platform for scalability and reliability.

## Description


App absorb information from few apis which provide links for articles and general info about them.
After that parse articles from web page, store in database and show it at React frontend.

Script for absorbation (`app:absorb`) runs every day at 1:00



## Install

````
- docker compose up --build
- docker exec news-server-1 php artisan migrate
- docker exec news-server-1 php artisan app:absorb  (necessary for initial data absorbation)

````

Open app on http://localhost:3000/




 

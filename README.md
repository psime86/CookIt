# CookIt

A collaborative React-native application built using expo, Facebook Dev Tools, and Spoonacular API.

### Built by

-pprchang (https://github.com/pprchang)

-psime86    (https://github.com/psime86)

-bauter (https://github.com/Bauter)

## Still in development!

##### App Dependencies:

npm i @react-navigation/native

expo install react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

expo install expo-facebook

npm i axios node dotenv

---------------------------------------------

##### Backend Dependencies:

npm i axios concurrently express if-env mongoose node path

Node.js

MongoDB

### To run the current application...

- Code editor needed.

- Node.js needed.

- MongoDB needed.

- Android Studio Code Needed and emulator created.

1. Clone the repo to local directory.

2. mongod running in background.

3. Run `npm install` in both front end and backend ( `cd backend/`).

4. Insert your computer IPv4 address into API.js routes (run `ipconfg` in command prompt on WIN 10).

5. visit https://spoonacular.com/food-api and sign up for a basic (free) plan to obtain an API key.

6. Create a ".env" file in the front end of the application with the value of your API key saved to the key name "SPOONACULAR_API=".

7. Open terminal and run `cd backend/` to navigate to the backend. Then run `npm run dev` to launch both the front and back end.

8. Navigate in your local browser to http://localhost:19002/. Select "Run on Android device/emulator" once the emulator is open to launch the application.


### Demo

#### Login / logout

![login_logout](assets/images/login_logout.gif)

#### Spoonacular API search by query

![searchAPI](assets/images/searchAPI.gif)

#### HomeScreen

![homeScreen_functions](assets/images/homeScreen_functions.gif)

#### Grocery List

![groceryList](assets/images/groceryList.gif)

#### Favorites

![favorites](assets/images/favorites.gif)


### Plans for future improvements

- Share button (via FB SDK).

- Persistent-login.

- Dropdown menus to specify Spoonacular API search parameters (ex. breakfast, dinner, gluten free, vegetarian, etc.).

- Create /  search  recipes from what users have on hand.
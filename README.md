# **Book-Search-React-App**

This application uses goodreads api to look for books by title, author or isbn code.

This project was bootstrapped with `create-react-app` and deployed live at http://book-search-react-app.herokuapp.com/

# Running the application locally

**Prerequisites:** You need to have Node + NPM installed.

**For local run to avoid CORS error use this link:** https://cors-anywhere.herokuapp.com/

**Required Environment Variables:**

`REACT_APP_API_KEY` : Goodreads API Key you can get from [here](https://www.goodreads.com/api/keys).

Save it in the `.env` file as described [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)

Having done that, here is how to run the application locally in development mode.

**Clone the repo:**

    git clone https://github.com/niinpatel/goodreads-react.git

**Install dependencies:**

    npm install

**Starting the application in development mode:**

    npm start

# Building the application:

To build the production assets, run

    npm run build

# Features In Current Version:

1. Search for books by title, author, or ISBN.
2. Displays upto 20 search results in bootstrap cards.
3. Displays only title, author, and link button to book detail page.
4. See the description and rating, and other details by clicking on more info button.

# Future Implementation:

Some of the things that I want to implement in the future version are:
1. We can display book search result with pagination.
2. Ability to see Rating details.
3. Ability to see others' reviews.
4. Ability to sign in with github so users can add their own reviews and ratings.

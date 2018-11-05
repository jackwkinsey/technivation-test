# Technivation Interview Test

This application was created to demonstrate knowledge and use of the React.js framework. It simulates a user viewing their accounts at their bank, seeing which ones are eligible for joing a rewards program, enrolling in the program (if eligible), and redeeming reward points (if able).

It uses a test API provided by Technivation for fetching accounts, enrolling them in the rewards program, and redeeming points.

_This application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

## Building Project

Once you've pulled the project, simply run `npm install` and then `npm start` to spin up the development server to view.

`npm start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Next Steps & Improvements

Due to the fact that this project was completed over a weekend, there are definitely areas for improvement for the app.

- Show loading indication whenever an API call is made. Due to the test nature of the API, it returns quite quickly, but it is likely that this wouldn't be the case in a production environment. The API would most likely involve more validation/calculations when processing tasks on a give account and so it would be appropriate to display some sort of loading indicator to the user. In the code, you'll see that the beginning work for this is laid out in the form of `this.setState({loading: true})` when an API call is kicked off and then loading is set to `false` when the API call finishes. This state could then be used to conditionally show a loading indicator.

- I could envision the API eventually having some sort of endpoint to get more details on an account that could be shown when a user views a specific account (i.e. selects one from the list on the main page). Thus, the details view could have more information for each account (e.g. recent transactions, interest rate for loan accounts, interest gained for savings accounts, credit limits for credit accounts, etc.)

- In each account "card" you'll notice that the "account type" is shown. The card component has a way to add an image and this would be a great way to visualize the account type (especially on the account details view).

- Code Optimizations & Improvements:

  - Implement a better way to keep track of which account is being "enrolled" or "redeemed". Currently, the code uses `findIndex` to get the index from the main accounts list for the account that was modified and then updates the state client side. This is fine when a user only has a few accounts, but if a user could potentially have hundereds of accounts this will become a bottleneck very quickly. However, I could see the API being used for this as a fetch of accounts could be used again after each modification. However, it would be better to manage state client side and then use the API to verify this state to keep the "wait time" for the user at a minimum.

  - I used the `fetch` API in JavaScript for conducting all of the API calls needed for this application. To improve on error handling, it might make sense to switch over to using a third-party library like `axios` for handling these calls. Also, some of the fetch code is a bit repetitive and could definitely be made cleaner by extracting out those parts into some sort of utility method.

# Waleete

This is a simple P2P wallet system

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Typescript

### How to Test

It's quite simple. Go to the [Live Link]() (The frontend is a little bit shabby, I didn't want to spend any time at all on that)

- Click on the signup button and signup
- While on the app, put in the amount you want to fund yourself and proceed to make payment with your favourite payment mechanism
- After payment, your balance updates and you can confirm that in your Database
- Head to /login, click the signup button and sign up with different details
- Go back to /login ajnd log in with the first account (might be confusing, but you'd have to create 2 users to test the transfer function)
- Click on the transfer button, put the email of the newly created user, the amount you want to send and put in your password for security reasons
- You see your balance is updated, and the transaction shows up in your transaction history
- Go back to /login again, log in with the newly created user, and see the funds right there

### How to Test Locally

- Open your terminal and clone the repo: `git clone https://github.com/Destiny-01/node-p2p-wallet.git`
- Then run `cd node-p2p-wallet` to enter into the directory
- Run `yarn` to install the dependencies
- Rename the .env.example file to .env and replace the dummy details
- Run `yarn start:dev`, go to `localhost:3000` and voila!

There is much room for improvement, but for time and simplicity sake, I stick to this ones for now

I hope you enjoyed the app, and feedback is much highly appreciated

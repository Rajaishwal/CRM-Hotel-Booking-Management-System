
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# CRM-Hotel-Booking-Management-System
CRM-Hotel Booking Management System is a full-stack app using React.js, Node.js, Express.js, and MongoDB. It lets users book rooms and make payments via Razorpay, while admins manage rooms, bookings, and users through a secure dashboard.


# CRM Hotel Booking Management System 🏨

A full-stack hotel booking and management system built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**. This project provides a seamless experience for both hotel admins and customers, with real-time booking capabilities and payment integration via Razorpay.

## 🔧 Features

### 👤 User Features
- Register and login securely
- Search and book available rooms
- View booking history
- Make secure payments

### 🛠️ Admin Features
- Add, update, and delete rooms
- View all customer bookings
- Manage room availability
- Dashboard analytics (optional)

## 📁 Project Structure

CRM-Hotel-Booking-Management-System/
│
├── frontend/ # React.js frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
│
├── backend/ # Node.js + Express.js backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── .gitignore
├── README.md
├── package.json
└── package-lock.json


## ⚙️ Technologies Used

- **Frontend:** React.js, Axios, Bootstrap, etc.
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Payment Gateway:** Razorpay
- **Other:** Nodemon, CORS, Moment.js, ShortID

## 💳 Payment Integration

- Razorpay is integrated for real-time online payments.
- Backend securely handles order creation and verification.

## 🚀 Installation & Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Rajaishwal/CRM-Hotel-Booking-Management-System.git
cd CRM-Hotel-Booking-Management-System

### 2. Install dependencies

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```

### 3. Set environment variables

Create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.t8xxte6.mongodb.net/mern-roomstay?retryWrites=true&w=majority&appName=Cluster0
RAZORPAY_KEY_ID=<your-razorpay-key-id>


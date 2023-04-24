# Interview Scheduler
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Final Product
<img alt="Interview Scheduler Home Page" height="50%" width = "50%" src="./images/HomepageView.png"/> View of the Home page
<img alt="Add or Edit an Interview" height="50%" width ="50%" src="./images/AddEditInterview.png"/> View of the add or edit an interview functionality.  
<img alt="Delete an Interview" height="50%" width ="50%" src="./images/DeleteInterview.png"/> View of the delete an interview functionality.  

## Setup

For proper functionality the client and the API server applications must be running at the same time.

1. Follow the link to fork and clone the scheduler-api https://github.com/lighthouse-labs/scheduler-api.
2. Install and setup the database using the steps outlined in the README file.
3. Fork and clone this repo
4. From the root directory of the project install the dependencies using the command npm install
5. With the database setup and the scheduler-api server running, use the command npm start from the root directory of the project.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

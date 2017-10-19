## Project Overview
In the MyReads project, you'll create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. By building this project, you will gain an understanding of how Redux can function in a standard type of application.

You will start with local backend development server. The server is built in Node, but it is very simple. You won't need to edit the server code; instead, your code will talk to the server using documented API endpoints. You can use the server's endpoints to manage storing, reading, updating, and deleting data for your application.

Using this server, you will build a React/Redux front end for the application. The specification provided below is the minimum required for this project. You may extend your project however you like, however, as long as the minimum specification is met.

### Views
Your application should have, at a minimum, four views:

#### Default (Root)
should list all available categories, which should link to a category view for that category
should list all of the posts ordered by voteScore (highest score first)
should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
should have a control for adding a new post
#### Category View
identical to the default view, but filtered to only include posts with the selected category

![alt text](https://github.com/cagigas/Readable/blob/master/src/img1.png)

#### Post Detail View
should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
should list all of the comments for that post, ordered by voteScore (highest first)
should have controls to edit or delete the post
should have a control to add a new comment.
implement comment form however you want (inline, modal, etc.)
comments should also have controls for editing or deleting

![alt text](https://github.com/cagigas/Readable/blob/master/src/img2.png)

#### Create/Edit View
should have a form to create new post or edit existing posts
when editing, existing data should be populated in the form
![alt text](https://github.com/cagigas/Readable/blob/master/src/img3.png)


## Getting Started
```
git clone 'https://github.com/cagigas/Readable'
cd Readable
npm install
npm start
```
# Indice

- [Setup/Running instructions](#setuprunning-instructions)
- [Project description](#project-description)
- [Screenshots](#screenshots)
- [Technologies/Libraries](#technologieslibraries)
- [Decisitions](#decisitions)
- [Additional Info](#additional-info)
- [Demo](#demo)

# Setup/Running instructions

First, you need to clone the repository like this:

```bash
# Utilizando SSH
git clone git@github.com:pacasoft/ravn-fron-code-challenge.git
```

## Front end (Angular 17)

Then, install Angular 17 globally

```bash
npm install -g @angular/cli@17.3.0
```

Enter into the directory

```bash
cd ravn-challenge
```

Install angular dependencies

```bash
npm install
```

Start the server

```bash
ng serve
```

Build the app

```bash
ng build
```

# Project description

The current application is a task management app for project development.

The app allows users to login, browse, create, update, and delete tasks.

# Screenshots

## Dashboard grid

Here is a screenshot of the task grid view
![Dashboard grid](screenshots/dashboard_grid.png)

Here is a screenshot of the task list view
![Dashboard list](screenshots/dashboard_list.png)

# Decisitions

- I decided to use Signal store instead of NGRX store to simplify working with signals and share data betweens components and set a global state for the reutilization of the app data (Tasks, users, filters, profile).
- Angular material was added to simplify the design of the components shared accross the application.

# Technologies/Libraries

- Angular v17
- Apollo Client
- Signal Store
- GraphQL
- Github Actions
- Angular Materials

# Additional Info

## Login page

A login page was created to add functionality, but the login only does client-side verification and gets and allow the profile user to enter by entering the **full name** and **email**.

- Username: Israel Santiago Lopez Cruz
- Email: ilopez@pacasoft.cloud
  ![Login page](screenshots/login.png)

## Draggable cards

You can drag and drop tasks to change their position inside their status list and change of status by dragging the task into another list.
![Drag & Drop](screenshots/drag_drop.png)

## Github actions

## Optimistic mutations

Optimistic mutations have been used for updating, creating and deleting tasks including draggind and dropping tasks betweens lists.
![Optimistic Mutation example](screenshots/optim_mutation.png)

# Demo

- Link 1: [Github Pages](https://pacasoft.github.io/ravn-fron-code-challenge/ravn-challenge/dist/ravn-challenge/browser/)
- link 2: [Self Hosted](https://ravn-challenge.pacasoft.cloud)

ravn-user
ravn-challenge

**1. Initial setup**

This phase is all about your project initial configuration, we’d like to see how you envision the project, this includes the folders structure, naming conventions, styles, routing, etc.

- ~~[ ] Folder structure~~
- ~~[ ] Routing configuration (_You can add a basic NotFound and Error page if you’d like to)_~~
- [ ] Styles solution

Extra Credit: (Don’t focus too hard on these at the risk of everything else)

- Formatters / Linters (optional)
- Error boundary (optional)
- Github actions (optional)

**2. Create the dashboard UI**

We don’t need to add functionality to any of the components at this point, this should be only UI elements

**Sidebar**

- ~~[ ] Add the logo at the top~~
- ~~[ ] Add the “Dashboard” menu item to the side navigation~~

**Main content**

- ~~[ ] Add the “+” plus icon~~
- ~~[ ] Add the tasks columns (backlog, cancelled, done, in progress, todo)~~

**Task Card**

Each card should be placed within the column according to the task status, please add the following information:

- ~~[ ] Name~~
- ~~[ ] Tags (Android, React, etc)~~
- ~~[ ] Due date~~
- ~~[ ] Estimated time~~
- ~~[ ] User avatar (use a fake image or placeholder if not provided, eg: https://unsplash.com/)~~
- ~~[ ] Show the options icon _(3 dots in the top right corner)_~~

**3. Tasks query**

Now that we have the UI for the dashboard, we’ll connect to the api in order to pull the tasks information. Here you have a list of the basic functionalities we expect, however feel free to add additional things that could improve the UI, performance, animations, etc.

**Get**

- ~~[ ] Use the **tasks** query to pull all the available tasks~~
- ~~[ ] Use the data acquired from the **tasks** query to create the task columns and the cards in those columns~~
- ~~[ ] Show loading indicator when necessary (eg: while fetching data, you can use spinners or skeletons)~~
- [ ] Indicate when a query has failed
- ~~[ ] Show an empty state when there are no results found~~
- ~~[ ] Show the total count of tasks by column~~
- ~~[ ] Indicate to the user if the task is on time, late, or almost late. (white: on time, yellow: less than 2 days, red: date is older than current date)_Reference image:_~~

**4. Create task mutation**

Lets bring this app to life with some mutations, starting with the Create Task mutation.

**Note:**

Please feel free to modify/create a simpler version of the form or to use an external library in order to save some time styling the elements

**Create**

- ~~[ ] The create action should be the `+` red icon and it should show a create task modal when clicked~~
- ~~[ ] Use the **createTask** mutation to add a new task in the dashboard. You should be modifying the apollo cache to add this new item into the UI~~

**5. Update and Delete task mutation**

**Update**

- ~~[ ] Use the **updateTask** mutation to edit the card information,~~
- ~~[ ] it should allow the user to edit the following information:~~
- ~~due date~~
- ~~name~~
- ~~position~~
- ~~status~~
- ~~tags~~
- ~~estimated time~~
- ~~[ ] Show a modal with all the editable fields~~
- ~~[ ] Show a confirm and cancel buttons to confirm edition or cancel the action~~

**Delete**

- ~~[ ] Use the **deleteTask** mutation in order to delete a task by id~~
- ~~[ ] Show a confirmation message before deleting with _confirm_ and _delete_ buttons~~

**6. Filter tasks**

The get tasks query has some optional parameters, if one of these is sent in the request it should return only the data matching the filters added

- [ ] Add the logic to send filters the following optional filter in the request:
- ~~Name~~
- ~~DueDate~~
- ~~OwnerId~~
- ~~Status~~
- ~~Tags~~
- ~~EstimatedTime~~
- ~~[ ] If one or the combination of two or more filters doesn’t return information show an empty results component in the UI~~

**7. Show the user information**

Create a new route `settings` in which you can show all the user information, use the **profile** query in order to pull the data

- ~~[ ] Show the following information:~~
- ~~FullName~~
- ~~Email~~
- ~~Type~~
- ~~CreatedAt~~
- ~~UpdateAt~~

# Expense Manager - Vue 3

This project is an expense management application built with Vue 3, allowing users to manage their budget and track their expenses. All information is stored persistently in `localStorage` to ensure that data is not lost when the page is closed or reloaded. The app is fully responsive and includes a graphical representation of the expense progress using a `circle-progress` component.

## Features

- **Budget Management:** Users can set an initial budget.
- **Expense Tracking:** Users can add expenses and assign them to a category from a predefined list.
- **Categories:** Expenses can be classified into categories like "Food", "Transportation", "Entertainment", etc.
- **Expense Editing:** Users can modify the name, amount, and category of registered expenses.
- **Expense Deletion:** Users can delete expenses from the list.
- **Progress Graph:** A circular graph shows the percentage of the budget that has been spent, using the `circle-progress` component.
- **Responsiveness:** The app is fully responsive, providing a seamless experience on both mobile and desktop devices.
- **Data Persistence:** All data is stored in `localStorage`, ensuring that the information is retained even after closing or reloading the page.

## Technologies Used

- **Vue 3:** Main framework for building the user interface.
- **JavaScript (ES6+):** For the application logic.
- **HTML5 & CSS3:** For structuring and styling the interface.
- **localStorage:** To persist the data.
- **circle-progress:** For visualizing expense progress.
- **Responsive Design:** Media queries and flexible design to support multiple devices.

# Next.js Project

This project was created to test knowledge in Next.js, automated testing, Context API, and DevOps (deployment).

## Running the project

First, install the project dependencies:

> Note: Node.js version 20 is recommended.

```bash
npm install
```

Then, create a file at the root of the project with the following name:

```bash
.env.local
```

Inside it, add the line below:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Next, start the development server:

```bash
npm run dev
```

This command will start the front-end on http://localhost:3000 and the mocked back-end (json-server) on http://localhost:5000

## Business Rules

1. On the home page, in the "most searched" section, the events with the highest number of tickets sold are listed;

2. When clicking "buy" on any event card, the user is redirected to the purchase page;

3. On the "events" page, the event list includes filters that build a query using query parameters;

4. Filters can be applied by clicking the "filter" button or cleared by clicking the "clear filters" button;

5. To add an item to the cart, the user must first choose the ticket type (VIP, General Admission, or Half-price) and the quantity. Then click "select" and afterward "add to cart";

6. It is possible to add up to 3 ticket types with different quantities (maximum of 5) for the same event in the same cart;

7. Items can be added to and removed from the cart, and the cart can be accessed from anywhere in E-Ventos;

8. A purchase can only be completed if the user is authenticated. If not authenticated, a message is displayed in the cart and the user can navigate to the authentication page;

9. On the authentication page, the user can log in or register, and once logged in, they can complete a purchase;

10. The cart and authentication are managed as contexts and can be accessed from anywhere in E-Ventos. Both caches are stored in sessionStorage.

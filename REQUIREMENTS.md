# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be
able to browse an index of all products, see the specifics of a single product, and add products to an order that they
can view in a cart page. You have been tasked with building the API that will support this application, and your
coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as
well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `GET /products`
- Show `GET /products/:id`
- Create [token required] `POST /products`

#### Users

- Index [token required] `GET /users`
- Show [token required] `GET /users/:id`
- Create N[token required] `POST /users`

#### Orders

- Current Active Order by user (args: user id)[token required] `GET /orders/:id`
- Completed Orders by user (args: user id)[token required] `GET /orders/completed/:id`

## Data Shapes

#### Products

- id
- name
- price
- category

| Parameter  | Type                 | 
|:-----------|:---------------------|
| `id`       | `SERIAL PRIMARY KEY` | 
| `name`     | `VARCHAR (100)`      |                                    
| `price`    | `NUMERIC`            |                                         
| `category` | `VARCHAR (100)`      |                                          

#### Users

- id
- firstName
- lastName
- password

| Parameter   | Type                 |
|:------------|:---------------------|
| `id`        | `SERIAL PRIMARY KEY` |
| `firstname` | `VARCHAR (100)`      |                                    
| `lastname`  | `VARCHAR (100)`      |                                         
| `category`  | `VARCHAR (100)`      |

#### Orders

- id
- user_id
- status of order (active or complete)

| Parameter | Type                            |
|:----------|:--------------------------------|
| `id`      | `SERIAL PRIMARY KEY`            |
| `user_id` | `INTEGER REFERENCES users (id)` |                                    
| `status`  | `VARCHAR (100)`                 |              

#### Order_Products

- id
- quantity
- order_id
- product_id

| Parameter    | Type                             |
|:-------------|:---------------------------------|
| `id`         | `SERIAL PRIMARY KEY`             |
| `quantity`   | `INTEGER`                        |                                    
| `order_id`   | `bigint REFERENCES orders(id)`   |   
| `product_id` | `bigint REFERENCES products(id)` |   


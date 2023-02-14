CREATE TABLE orders
(
    id                 SERIAL PRIMARY KEY,
    product_ids        INTEGER[],
    product_quantities INTEGER[],
    user_id            INTEGER REFERENCES users (id),
    status             VARCHAR(30)
);
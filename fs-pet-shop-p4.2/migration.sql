DROP TABLE IF EXIST pets CASCADE;

CREATE TABLE pets (
    id serial primary key,
    age integer,
    kind varchar, 
    name varchar
)
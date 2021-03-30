DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    unique_id varchar (150) NOT NULL,
    title varchar (100) NOT NULL,
    username varchar (50) NOT NULL,
    body varchar(200) NOT NULL
    

);
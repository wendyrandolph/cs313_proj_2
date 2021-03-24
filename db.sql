
CREATE TABLE username
( username_id SERIAL PRIMARY KEY NOT NULL 
, username VARCHAR(100) NOT NULL
); 

CREATE TABLE score
( score_id SERIAL PRIMARY KEY NOT NULL 
, score INT NOT NULL 
, username_id INT NOT NULL
, FOREIGN KEY(username_id) 
	  REFERENCES username(username_id)
);

CREATE USER project2user WITH PASSWORD 'quickguiz'; 
GRANT SELECT, INSERT, DELETE, UPDATE ON username TO project2user; 
GRANT USAGE, SELECT ON SEQUENCE username_id_seq TO project2user; 

INSERT INTO username(username)
VALUES 
('wabbitslayer')
, ('buggsbunny')
; 
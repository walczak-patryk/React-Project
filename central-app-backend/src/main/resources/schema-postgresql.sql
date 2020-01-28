DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS booking;
CREATE SEQUENCE HIBERNATE_SEQUENCE;

CREATE TABLE users (
                       id INT DEFAULT HIBERNATE_SEQUENCE.nextval PRIMARY KEY,
                       login VARCHAR(250) NOT NULL,
                       password VARCHAR(250) NOT NULL,
                       first_name VARCHAR(250) NOT NULL,
                       last_name VARCHAR(250) NOT NULL,
                       security_tocken VARCHAR(250) NOT NULL
);

CREATE TABLE booking (
                         id INT DEFAULT HIBERNATE_SEQUENCE.nextval PRIMARY KEY,
                         owner INT NOT NULL,
                         start_date_time DATE NOT NULL,
                         active BOOLEAN  NOT NULL,
                         item_id INT NOT NULL,
                         item_type VARCHAR(250) NOT NULL,

);
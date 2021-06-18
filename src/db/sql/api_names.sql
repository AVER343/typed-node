CREATE TABLE API_NAMES(
   id            SERIAL       PRIMARY KEY, 
   api_name      VARCHAR(50) NOT NULL UNIQUE
);
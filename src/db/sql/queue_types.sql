CREATE TABLE QUEUE_TYPES(
   id            SERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL UNIQUE,
   priority      SMALLINT   DEFAULT(3) 
);



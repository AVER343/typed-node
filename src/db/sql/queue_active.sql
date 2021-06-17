CREATE TABLE QUEUE_ACTIVE(
   id            SERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL,
   data          JSONB DEFAULT '{}',
   user_id       BIGINT 
);



CREATE TABLE JOB_TABLE(
   id            BIGSERIAL       PRIMARY KEY, 
   "type"        VARCHAR(50) NOT NULL,
   data          JSONB DEFAULT '{}',
   user_id       BIGINT NOT NULL ,
   CREATED_TIME TIMESTAMP DEfAULT NOW(),
   MODIFIED_TIME TIMESTAMP DEFAULT NOW(),
   completed    BOOLEAN DEFAULT FALSE,
   completed_on TIMESTAMP 
);

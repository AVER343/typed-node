CREATE TABLE SPECIAL_PERMISSIONS(
   id             SERIAL       PRIMARY KEY, 
   api_id         INTEGER      NOT NULL,
   user_id        BIGINT       NOT NULL ,
   FOREIGN KEY(user_id) REFERENCES USERS(id),
   FOREIGN KEY(api_id) REFERENCES API_NAMES(id)  
);
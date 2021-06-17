CREATE TABLE ROLE_PERMISSIONS_API(
   id             SERIAL       PRIMARY KEY, 
   api_id  INTEGER    NOT NULL,
   role_type      SMALLINT DEFAULT(1) NOT NULL ,
   FOREIGN KEY(role_type) REFERENCES USER_ROLE_TYPE(id),
   FOREIGN KEY(api_id) REFERENCES API_PERMISSIONS(id)  
);
CREATE TABLE ROLE_PERMISSIONS_API(
   id             SERIAL       PRIMARY KEY, 
   api_id         INTEGER      NOT NULL,
   role_type      SMALLINT     NOT NULL ,
   FOREIGN KEY(role_type) REFERENCES USER_ROLE_TYPE(id),
   FOREIGN KEY(api_id) REFERENCES API_NAMES(id)  
);
INSERT INTO ROLE_PERMISSIONS_API(api_id,role_type) 
       VALUES( (SELECT id from API_NAMES where api_name='ROLE'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN'));
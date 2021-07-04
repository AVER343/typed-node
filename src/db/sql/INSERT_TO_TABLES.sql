INSERT INTO API_NAMES(API_NAME) VALUES('ROLE');

INSERT INTO USER_ROLE_TYPE(user_role) VALUES('ADMIN');
INSERT INTO USER_ROLE_TYPE(user_role) VALUES('DEFAULT');
INSERT INTO api_names(api_name) VALUES('POST_ROLE');
INSERT INTO api_names(api_name) VALUES('GET_ROLE');

INSERT INTO ROLE_PERMISSIONS_API(api_id,role_type) 
       VALUES( (SELECT id from API_NAMES where api_name='ROLE'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN'))
               ( (SELECT id from API_NAMES where api_name='POST_ROLE'),
               (SELECT id from USER_ROLE_TYPE WHERE user_role='ADMIN'));     
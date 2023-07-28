CREATE DATABASE IF NOT EXISTS itmanagergame;
/* @TODO Make the proper GRANT for this user
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, REFERENCES ON itmanagergame.* TO 'itmanagergame_user_1'@'%' WITH GRANT OPTION; */
GRANT ALL ON itmanagergame.* TO 'itmanagergame_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
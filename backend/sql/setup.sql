CREATE DATABASE oncovid;

-- In production be sure to manually change and reconfigure the password
CREATE USER 'oncovid'@'localhost' IDENTIFIED BY 'dk82lcxIEw91cL';
GRANT ALL ON oncovid.* TO 'oncovid'@'localhost';

FLUSH PRIVILEGES;

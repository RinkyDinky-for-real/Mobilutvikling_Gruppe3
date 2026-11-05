drop table Tokens;
drop table posts;
drop table users;
CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY, userName TEXT, passwordHash TEXT, favoriteFishingMethod text, favoritePlace text, favoriteFish text);
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS posts (postId text PRIMARY KEY, userId text, title text, content text, latitude integer, longitude integer, date text, FOREIGN KEY (userId) REFERENCES users(userId));

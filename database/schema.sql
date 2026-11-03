drop table Posts;
drop table Accounts;
CREATE TABLE IF NOT EXISTS Accounts (AccountId TEXT PRIMARY KEY, UserName TEXT, PassWordHash TEXT, FavoriteFishingMethod text, FavoritePlace text, FavoriteFish text);
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Posts (PostId text PRIMARY KEY, UserId text, Title text, Content text, latitude integer, longtitude integer, Date text, FOREIGN KEY (UserId) REFERENCES Accounts(AccountId));
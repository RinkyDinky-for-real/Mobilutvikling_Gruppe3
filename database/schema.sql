drop table Accounts;
CREATE TABLE IF NOT EXISTS Accounts (AccountId TEXT PRIMARY KEY, UserName TEXT, PassWordHash TEXT);
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Posts (PostId text PRIMARY KEY, UserId text, Title text, Content text, latitude integer, longtitude integer, FOREIGN KEY (UserId) REFERENCES Accounts(AccountId));
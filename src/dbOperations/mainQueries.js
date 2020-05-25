export const MAIN_QUERIES = {
  CREATE_TABLE_USER:
    "create table if not exists user (id integer primary key not null, name text, image text, purchaseId integer);",
  CREATE_TABLE_PURCHASE:
    "create table if not exists purchase (id integer primary key not null, image text, category text, subcategory text, amount integer, comment text, date text);",
  CREATE_TABLE_CATEGORY:
    "create table if not exists category (id integer primary key not null, name text, image text);",
  CREATE_TABLE_SUBCATEGORY:
    "create table if not exists subcategory (id integer primary key not null, name text, image text);"
};

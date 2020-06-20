export const MAIN_QUERIES = {
  CREATE_TABLE_USER: `
    CREATE TABLE IF NOT EXISTS "user" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT DEFAULT "",
      "image"	TEXT DEFAULT "",
      "active"	INTEGER DEFAULT 1
    );
  `,
  CREATE_TABLE_PURCHASE: `
    CREATE TABLE IF NOT EXISTS "purchase" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "image"	TEXT DEFAULT "",
      "categoryId"	INTEGER,
      "subcategoryId"	INTEGER,
      "amount"	INTEGER,
      "comment"	TEXT DEFAULT "",
      "date"	TEXT,
      "active"	INTEGER DEFAULT 1,
      FOREIGN KEY("categoryId") REFERENCES "category"("id")
    );
  `,
  CREATE_TABLE_CATEGORY: `
    CREATE TABLE IF NOT EXISTS "category" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT NOT NULL,
      "image"	TEXT DEFAULT "",
      "active"	INTEGER DEFAULT 1
    );
  `,
  CREATE_TABLE_SUBCATEGORY: `
    CREATE TABLE IF NOT EXISTS "subcategory" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT NOT NULL,
      "image"	TEXT DEFAULT "",
      "active"	INTEGER DEFAULT 1
    );
  `
};

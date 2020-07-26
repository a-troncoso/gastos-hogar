export const MAIN_QUERIES = {
  CREATE_TABLE_USER: `
    CREATE TABLE IF NOT EXISTS "user" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT DEFAULT "",
      "image"	TEXT DEFAULT "",
      "active"	INTEGER DEFAULT 1
    );
  `,
  OVERRIDE_TABLE_USER: `
    DROP TABLE IF EXISTS "user";
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
      "categoryId"	INTEGER,
      "subcategoryId"	INTEGER,
      "amount"	INTEGER,
      "comment"	TEXT DEFAULT "",
      "date"	TEXT,
      "active"	INTEGER DEFAULT 1,
      FOREIGN KEY("categoryId") REFERENCES "category"("id")
    );
  `,
  OVERRIDE_TABLE_PURCHASE: `
    DROP TABLE IF EXISTS "purchase";
    CREATE TABLE IF NOT EXISTS "purchase" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "image"	TEXT DEFAULT "",
      "categoryId"	INTEGER UNIQUE,
      "subcategoryId"	INTEGER UNIQUE,
      "amount"	INTEGER,
      "comment"	TEXT DEFAULT "",
      "date"	TEXT,
      "userId"	INTEGER,
      "active"	INTEGER DEFAULT 1,
      FOREIGN KEY("userId") REFERENCES "user"("id"),
      FOREIGN KEY("categoryId") REFERENCES "category"("id"),
      FOREIGN KEY("subcategoryId") REFERENCES "subcategory"("id")
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
  OVERRIDE_TABLE_CATEGORY: `
    DROP TABLE IF EXISTS "category";
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
  `,
  OVERRIDE_TABLE_SUBCATEGORY: `
    DROP TABLE IF EXISTS "subcategory";
    CREATE TABLE IF NOT EXISTS "subcategory" (
      "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name"	TEXT NOT NULL,
      "image"	TEXT DEFAULT "",
      "active"	INTEGER DEFAULT 1,
      "categoryId"	INTEGER
    );
  `,
  CREATE_TABLE_PURCHASE_IMAGE: `
    CREATE TABLE IF NOT EXISTS "purchase_image" (
      "id"	INTEGER,
      "image"	TEXT NOT NULL,
      "purchaseId"	INTEGER,
      "active"	INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY("purchaseId") REFERENCES "purchase"("id"),
      PRIMARY KEY("id")
    );
  `,
  OVERRIDE_TABLE_PURCHASE_IMAGE: `
    DROP TABLE IF EXISTS "purchase_image";
    CREATE TABLE IF NOT EXISTS "purchase_image" (
      "id"	INTEGER,
      "image"	TEXT NOT NULL,
      "purchaseId"	INTEGER,
      "active"	INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY("purchaseId") REFERENCES "purchase"("id"),
      PRIMARY KEY("id")
    );
  `,
};

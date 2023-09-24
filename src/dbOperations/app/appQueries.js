export const MAIN_QUERIES = {
  CREATE_TABLE_USER: `
    CREATE TABLE IF NOT EXISTS "user" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT DEFAULT "",
      "imagePath" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1
    );
  `,
  OVERRIDE_TABLE_USER: `
    DROP TABLE IF EXISTS "user";
    CREATE TABLE IF NOT EXISTS "user" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT DEFAULT "",
      "imagePath" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1
    );
  `,
  CREATE_TABLE_EXPENSE: `
    CREATE TABLE IF NOT EXISTS "expense" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "categoryId" INTEGER,
      "subcategoryId" INTEGER,
      "amount" INTEGER,
      "description" TEXT DEFAULT "",
      "date" TEXT,
      "userId" INTEGER,
      "extOperationNumber" TEXT DEFAULT "",
      "source" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1,
      FOREIGN KEY("categoryId") REFERENCES "category"("id"),
      FOREIGN KEY("subcategoryId") REFERENCES "subcategory"("id"),
      FOREIGN KEY("userId") REFERENCES "user"("id")
    );
  `,
  OVERRIDE_TABLE_EXPENSE: `
    DROP TABLE IF EXISTS "expense";
    CREATE TABLE IF NOT EXISTS "expense" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "categoryId" INTEGER UNIQUE,
      "subcategoryId" INTEGER UNIQUE,
      "amount" INTEGER,
      "description" TEXT DEFAULT "",
      "date" TEXT,
      "userId" INTEGER,
      "extOperationNumber" TEXT DEFAULT "",
      "source" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1,
      FOREIGN KEY("categoryId") REFERENCES "category"("id"),
      FOREIGN KEY("subcategoryId") REFERENCES "subcategory"("id"),
      FOREIGN KEY("userId") REFERENCES "user"("id")
    );
  `,
  CREATE_TABLE_CATEGORY: `
    CREATE TABLE IF NOT EXISTS "category" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT NOT NULL,
      "imagePath" TEXT DEFAULT "",
      "extraData" TEXT DEFAULT "",
      "maxAmountPerMonth" INTEGER DEFAULT 0,
      "active" INTEGER DEFAULT 1
    );
  `,
  OVERRIDE_TABLE_CATEGORY: `
    DROP TABLE IF EXISTS "category";
    CREATE TABLE IF NOT EXISTS "category" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT NOT NULL,
      "imagePath" TEXT DEFAULT "",
      "extraData" TEXT DEFAULT "",
      "maxAmountPerMonth" INTEGER DEFAULT 0,
      "active" INTEGER DEFAULT 1
    );
  `,
  CREATE_TABLE_SUBCATEGORY: `
    CREATE TABLE IF NOT EXISTS "subcategory" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT NOT NULL,
      "imagePath" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1
    );
  `,
  OVERRIDE_TABLE_SUBCATEGORY: `
    DROP TABLE IF EXISTS "subcategory";
    CREATE TABLE IF NOT EXISTS "subcategory" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      "name" TEXT NOT NULL,
      "imagePath" TEXT DEFAULT "",
      "active" INTEGER DEFAULT 1,
      "categoryId" INTEGER
    );
  `,
  CREATE_TABLE_PURCHASE_IMAGE: `
    CREATE TABLE IF NOT EXISTS "expense_image" (
      "id" INTEGER PRIMARY KEY,
      "expenseId" INTEGER,
      "imagePath" TEXT NOT NULL,
      "active" INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY("expenseId") REFERENCES "expense"("id")
    );
  `,
  OVERRIDE_TABLE_PURCHASE_IMAGE: `
    DROP TABLE IF EXISTS "expense_image";
    CREATE TABLE IF NOT EXISTS "expense_image" (
      "id" INTEGER PRIMARY KEY,
      "expenseId" INTEGER,
      "imagePath" TEXT NOT NULL,
      "active" INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY("expenseId") REFERENCES "expense"("id")
    );
  `,
  CREATE_TABLE_EXTERNAL_SOURCE: `
  CREATE TABLE IF NOT EXISTS "external_source" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL
  );
`,
  OVERRIDE_TABLE_EXTERNAL_SOURCE: `
  DROP TABLE IF EXISTS "external_source";
  CREATE TABLE IF NOT EXISTS "external_source" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL
  );
`,
  CREATE_TABLE_INCOME: `
  CREATE TABLE IF NOT EXISTS "income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,
    "extOperationNumber" TEXT DEFAULT "",
    "source" TEXT DEFAULT "",
    "active" INTEGER DEFAULT 1
  );
`,
  OVERRIDE_TABLE_INCOME: `
  DROP TABLE IF EXISTS "income";
  CREATE TABLE IF NOT EXISTS "income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,
    "extOperationNumber" TEXT DEFAULT "",
    "source" TEXT DEFAULT "",
    "active" INTEGER DEFAULT 1
  );
`,
};

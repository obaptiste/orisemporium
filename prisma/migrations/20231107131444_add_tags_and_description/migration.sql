-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "_QRCodeToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QRCodeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "QRCode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QRCodeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QRCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productHandle" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'no description provided',
    "destination" TEXT NOT NULL,
    "scans" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_QRCode" ("createdAt", "destination", "id", "productHandle", "productId", "productVariantId", "scans", "shop", "title") SELECT "createdAt", "destination", "id", "productHandle", "productId", "productVariantId", "scans", "shop", "title" FROM "QRCode";
DROP TABLE "QRCode";
ALTER TABLE "new_QRCode" RENAME TO "QRCode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_QRCodeToTag_AB_unique" ON "_QRCodeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QRCodeToTag_B_index" ON "_QRCodeToTag"("B");

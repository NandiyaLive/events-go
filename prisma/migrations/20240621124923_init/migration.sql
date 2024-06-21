/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Event";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "description" TEXT,
    "startDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    "venueId" TEXT NOT NULL,
    CONSTRAINT "events_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__EquipmentToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EquipmentToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EquipmentToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__EquipmentToEvent" ("A", "B") SELECT "A", "B" FROM "_EquipmentToEvent";
DROP TABLE "_EquipmentToEvent";
ALTER TABLE "new__EquipmentToEvent" RENAME TO "_EquipmentToEvent";
CREATE UNIQUE INDEX "_EquipmentToEvent_AB_unique" ON "_EquipmentToEvent"("A", "B");
CREATE INDEX "_EquipmentToEvent_B_index" ON "_EquipmentToEvent"("B");
CREATE TABLE "new__EventToPersonnel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EventToPersonnel_A_fkey" FOREIGN KEY ("A") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventToPersonnel_B_fkey" FOREIGN KEY ("B") REFERENCES "Personnel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__EventToPersonnel" ("A", "B") SELECT "A", "B" FROM "_EventToPersonnel";
DROP TABLE "_EventToPersonnel";
ALTER TABLE "new__EventToPersonnel" RENAME TO "_EventToPersonnel";
CREATE UNIQUE INDEX "_EventToPersonnel_AB_unique" ON "_EventToPersonnel"("A", "B");
CREATE INDEX "_EventToPersonnel_B_index" ON "_EventToPersonnel"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

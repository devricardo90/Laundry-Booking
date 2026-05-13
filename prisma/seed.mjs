import { execFileSync } from "node:child_process";

const operationalTimezone = "Europe/Stockholm";

function getDatePartsInTimezone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year").value),
    month: Number(parts.find((part) => part.type === "month").value),
    day: Number(parts.find((part) => part.type === "day").value),
  };
}

function getTimezoneOffsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return (asUtc - date.getTime()) / 60000;
}

function localTimeToUtcIso(dateParts, hour, timeZone) {
  const utcGuess = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, hour));
  const offsetMinutes = getTimezoneOffsetMinutes(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offsetMinutes * 60000).toISOString();
}

const tomorrow = new Date();
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

const seedDate = getDatePartsInTimezone(tomorrow, operationalTimezone);
const activeStartTime = localTimeToUtcIso(seedDate, 8, operationalTimezone);
const activeEndTime = localTimeToUtcIso(seedDate, 10, operationalTimezone);
const blockedStartTime = localTimeToUtcIso(seedDate, 10, operationalTimezone);
const blockedEndTime = localTimeToUtcIso(seedDate, 12, operationalTimezone);
const canceledStartTime = localTimeToUtcIso(seedDate, 12, operationalTimezone);
const canceledEndTime = localTimeToUtcIso(seedDate, 14, operationalTimezone);
const canceledAt = new Date().toISOString();

const sql = String.raw`
INSERT INTO "laundry_rooms" ("id", "name", "status", "created_at", "updated_at")
VALUES
  ('11111111-1111-4111-8111-111111111111', 'Laundry Room A', 'ACTIVE', NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "status" = EXCLUDED."status",
  "updated_at" = NOW();

INSERT INTO "residents" ("id", "name", "email", "status", "created_at", "updated_at")
VALUES
  ('22222222-2222-4222-8222-222222222222', 'Development Resident', 'resident.dev@example.local', 'ACTIVE', NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "email" = EXCLUDED."email",
  "status" = EXCLUDED."status",
  "updated_at" = NOW();

INSERT INTO "admins" ("id", "name", "email", "status", "created_at", "updated_at")
VALUES
  ('33333333-3333-4333-8333-333333333333', 'Development Admin', 'admin.dev@example.local', 'ACTIVE', NOW(), NOW())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "email" = EXCLUDED."email",
  "status" = EXCLUDED."status",
  "updated_at" = NOW();

INSERT INTO "bookings" ("id", "resident_id", "laundry_room_id", "start_time", "end_time", "status", "canceled_at", "created_at", "updated_at")
VALUES
  (
    '44444444-4444-4444-8444-444444444444',
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    '${activeStartTime}',
    '${activeEndTime}',
    'ACTIVE',
    NULL,
    NOW(),
    NOW()
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    '${canceledStartTime}',
    '${canceledEndTime}',
    'CANCELED',
    '${canceledAt}',
    NOW(),
    NOW()
  )
ON CONFLICT ("id") DO UPDATE SET
  "resident_id" = EXCLUDED."resident_id",
  "laundry_room_id" = EXCLUDED."laundry_room_id",
  "start_time" = EXCLUDED."start_time",
  "end_time" = EXCLUDED."end_time",
  "status" = EXCLUDED."status",
  "canceled_at" = EXCLUDED."canceled_at",
  "updated_at" = NOW();

INSERT INTO "blocked_slots" ("id", "laundry_room_id", "start_time", "end_time", "reason", "created_by_admin_id", "created_at", "updated_at")
VALUES
  (
    '66666666-6666-4666-8666-666666666666',
    '11111111-1111-4111-8111-111111111111',
    '${blockedStartTime}',
    '${blockedEndTime}',
    'MAINTENANCE',
    '33333333-3333-4333-8333-333333333333',
    NOW(),
    NOW()
  )
ON CONFLICT ("id") DO UPDATE SET
  "laundry_room_id" = EXCLUDED."laundry_room_id",
  "start_time" = EXCLUDED."start_time",
  "end_time" = EXCLUDED."end_time",
  "reason" = EXCLUDED."reason",
  "created_by_admin_id" = EXCLUDED."created_by_admin_id",
  "updated_at" = NOW();

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM "laundry_rooms" WHERE "id" = '11111111-1111-4111-8111-111111111111') <> 1 THEN
    RAISE EXCEPTION 'Expected one development laundry room';
  END IF;
  IF (SELECT COUNT(*) FROM "residents" WHERE "id" = '22222222-2222-4222-8222-222222222222') <> 1 THEN
    RAISE EXCEPTION 'Expected one development resident';
  END IF;
  IF (SELECT COUNT(*) FROM "admins" WHERE "id" = '33333333-3333-4333-8333-333333333333') <> 1 THEN
    RAISE EXCEPTION 'Expected one development admin';
  END IF;
  IF (SELECT COUNT(*) FROM "bookings" WHERE "id" = '44444444-4444-4444-8444-444444444444' AND "status" = 'ACTIVE') <> 1 THEN
    RAISE EXCEPTION 'Expected one development ACTIVE booking';
  END IF;
  IF (SELECT COUNT(*) FROM "bookings" WHERE "id" = '55555555-5555-4555-8555-555555555555' AND "status" = 'CANCELED') <> 1 THEN
    RAISE EXCEPTION 'Expected one development CANCELED booking';
  END IF;
  IF (SELECT COUNT(*) FROM "blocked_slots" WHERE "id" = '66666666-6666-4666-8666-666666666666') <> 1 THEN
    RAISE EXCEPTION 'Expected one development blocked slot';
  END IF;
END $$;
`;

execFileSync(
  process.platform === "win32" ? "cmd.exe" : "pnpm",
  [
    ...(process.platform === "win32" ? ["/c", "pnpm.cmd"] : []),
    "exec",
    "prisma",
    "db",
    "execute",
    "--stdin",
    "--config",
    "prisma.config.ts",
  ],
  {
    input: sql,
    stdio: ["pipe", "inherit", "inherit"],
    env: process.env,
  },
);

console.log("Seed verified: laundryRooms=1 residents=1 admins=1 activeBookings=1 canceledBookings=1 blockedSlots=1");

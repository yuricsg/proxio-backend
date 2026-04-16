import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const deviceBrandEnum = pgEnum('device_brand', [
  'samsung',
  'apple',
  'motorola',
  'xiaomi',
  'lg',
  'other',
]);

export const problemTypeEnum = pgEnum('problem_type', [
  'broken_screen',
  'battery',
  'camera',
  'charging_port',
  'speaker',
  'software',
  'water_damage',
  'other',
]);

export const requestStatusEnum = pgEnum('request_status', [
  'new',
  'in_analysis',
  'quoted',
  'done',
]);

export const planEnum = pgEnum('plan', [
  'free',
  'starter',
  'pro',
]);


export const tenantsTable = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  domain: varchar('domain', { length: 100 }).notNull().unique(),
  ownerEmail: varchar('owner_email', { length: 255 }).notNull().unique(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  plan: planEnum('plan').default('free').notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});


export const serviceRequestsTable = pgTable('service_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenantsTable.id, { onDelete: 'cascade' }),

  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }),

  brand: deviceBrandEnum('brand').notNull(),
  device: varchar('device', { length: 255 }).notNull(),

  hasFallen: boolean('has_fallen').default(false).notNull(),
  hasLiquidDamage: boolean('has_liquid_damage').default(false).notNull(),
  isCharging: boolean('is_charging').default(false).notNull(),

  problemType: problemTypeEnum('problem_type').notNull(),
  problemDescription: text('problem_description'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const serviceRequestStatusTable = pgTable('service_request_status', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => serviceRequestsTable.id, { onDelete: 'cascade' }),
  status: requestStatusEnum('status').notNull(),
  note: text('note'),
  acceptedAt: timestamp('accepted_at').defaultNow().notNull(),
});


export const requestPhotosTable = pgTable('request_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => serviceRequestsTable.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileSize: integer('file_size').notNull(),
  fileKey: varchar('file_key', { length: 500 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export type Tenant = typeof tenantsTable.$inferSelect;
export type NewTenant = typeof tenantsTable.$inferInsert;
export type ServiceRequest = typeof serviceRequestsTable.$inferSelect;
export type NewServiceRequest = typeof serviceRequestsTable.$inferInsert;
export type ServiceRequestStatus = typeof serviceRequestStatusTable.$inferSelect;
export type NewServiceRequestStatus = typeof serviceRequestStatusTable.$inferInsert;
export type RequestPhoto = typeof requestPhotosTable.$inferSelect;
export type NewRequestPhoto = typeof requestPhotosTable.$inferInsert;



import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';

export const requestStatusEnum = pgEnum('request_status', [
  'new',
  'in_analysis',
  'quoted',
  'done',
]);

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


export const tenantsTable = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(), // techfix.approva.com
  ownerEmail: varchar('owner_email', { length: 255 }).notNull().unique(),
  whatsappNumber: varchar('whatsapp_number', { length: 20 }), // usado no deep link
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const serviceRequestsTable = pgTable('service_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenantsTable.id, { onDelete: 'cascade' }),

  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),

  deviceBrand: deviceBrandEnum('device_brand').notNull(),
  deviceModel: varchar('device_model', { length: 255 }).notNull(),
  problemType: problemTypeEnum('problem_type').notNull(),
  problemDescription: text('problem_description'),

  status: requestStatusEnum('status').default('new').notNull(),

  technicianNote: text('technician_note'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const requestPhotosTable = pgTable('request_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => serviceRequestsTable.id, { onDelete: 'cascade' }),
  storageUrl: text('storage_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export type Tenant = typeof tenantsTable.$inferSelect;
export type NewTenant = typeof tenantsTable.$inferInsert;
export type ServiceRequest = typeof serviceRequestsTable.$inferSelect;
export type NewServiceRequest = typeof serviceRequestsTable.$inferInsert;



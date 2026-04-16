CREATE TYPE "public"."device_brand" AS ENUM('samsung', 'apple', 'motorola', 'xiaomi', 'lg', 'other');--> statement-breakpoint
CREATE TYPE "public"."problem_type" AS ENUM('broken_screen', 'battery', 'camera', 'charging_port', 'speaker', 'software', 'water_damage', 'other');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('new', 'in_analysis', 'quoted', 'done');--> statement-breakpoint
CREATE TABLE "request_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"storage_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"client_phone" varchar(20) NOT NULL,
	"device_brand" "device_brand" NOT NULL,
	"device_model" varchar(255) NOT NULL,
	"problem_type" "problem_type" NOT NULL,
	"problem_description" text,
	"status" "request_status" DEFAULT 'new' NOT NULL,
	"technician_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"owner_email" varchar(255) NOT NULL,
	"whatsapp_number" varchar(20),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug"),
	CONSTRAINT "tenants_owner_email_unique" UNIQUE("owner_email")
);
--> statement-breakpoint
ALTER TABLE "request_photos" ADD CONSTRAINT "request_photos_request_id_service_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."service_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
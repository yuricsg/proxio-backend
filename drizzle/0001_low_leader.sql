CREATE TYPE "public"."plan" AS ENUM('free', 'starter', 'pro');--> statement-breakpoint
CREATE TABLE "service_request_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"status" "request_status" NOT NULL,
	"note" text,
	"accepted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_slug_unique";--> statement-breakpoint
ALTER TABLE "request_photos" ADD COLUMN "file_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "request_photos" ADD COLUMN "file_size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "request_photos" ADD COLUMN "file_key" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "client_email" varchar(255);--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "brand" "device_brand" NOT NULL;--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "device" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "has_fallen" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "has_liquid_damage" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "service_requests" ADD COLUMN "is_charging" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "domain" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "phone_number" varchar(20);--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "plan" "plan" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "service_request_status" ADD CONSTRAINT "service_request_status_request_id_service_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."service_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_photos" DROP COLUMN "storage_url";--> statement-breakpoint
ALTER TABLE "service_requests" DROP COLUMN "device_brand";--> statement-breakpoint
ALTER TABLE "service_requests" DROP COLUMN "device_model";--> statement-breakpoint
ALTER TABLE "service_requests" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "service_requests" DROP COLUMN "technician_note";--> statement-breakpoint
ALTER TABLE "tenants" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "tenants" DROP COLUMN "whatsapp_number";--> statement-breakpoint
ALTER TABLE "tenants" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_domain_unique" UNIQUE("domain");
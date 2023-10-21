CREATE TABLE IF NOT EXISTS "users" (
	"serial" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"created_at" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "first_name_idx" ON "users" ("first_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "last_name_idx" ON "users" ("last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"title" varchar(255),
	"content" varchar(255),
	"created_at" timestamp (6) with time zone DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"serial" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"created_at" timestamp (6) with time zone DEFAULT NOW()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_user_id_idx" ON "posts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_title_idx" ON "posts" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_content_idx" ON "posts" ("content");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_first_name_idx" ON "users" ("first_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_last_name_idx" ON "users" ("last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_serial_fk" FOREIGN KEY ("user_id") REFERENCES "users"("serial") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

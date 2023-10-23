-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	`created_at` text DEFAULT 'sql`(CURRENT_TIMESTAMP)`'
);
--> statement-breakpoint
CREATE INDEX `first_name_idx` ON `users` (`first_name`);--> statement-breakpoint
CREATE INDEX `last_name_idx` ON `users` (`last_name`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `users` (`created_at`);
*/
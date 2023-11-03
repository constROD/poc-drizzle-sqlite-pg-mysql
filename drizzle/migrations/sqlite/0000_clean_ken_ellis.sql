CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`title` text,
	`content` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `posts_user_id_idx` ON `posts` (`user_id`);--> statement-breakpoint
CREATE INDEX `posts_title_idx` ON `posts` (`title`);--> statement-breakpoint
CREATE INDEX `posts_content_idx` ON `posts` (`content`);--> statement-breakpoint
CREATE INDEX `posts_created_at_idx` ON `posts` (`created_at`);--> statement-breakpoint
CREATE INDEX `users_first_name_idx` ON `users` (`first_name`);--> statement-breakpoint
CREATE INDEX `users_last_name_idx` ON `users` (`last_name`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`title` varchar(255),
	`content` varchar(255),
	`created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`email` varchar(255),
	`created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `posts_user_id_idx` ON `posts` (`user_id`);--> statement-breakpoint
CREATE INDEX `posts_title_idx` ON `posts` (`title`);--> statement-breakpoint
CREATE INDEX `posts_content_idx` ON `posts` (`content`);--> statement-breakpoint
CREATE INDEX `posts_created_at_idx` ON `posts` (`created_at`);--> statement-breakpoint
CREATE INDEX `users_first_name_idx` ON `users` (`first_name`);--> statement-breakpoint
CREATE INDEX `users_last_name_idx` ON `users` (`last_name`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
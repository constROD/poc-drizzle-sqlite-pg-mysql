CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`email` varchar(255),
	`created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `first_name_idx` ON `users` (`first_name`);--> statement-breakpoint
CREATE INDEX `last_name_idx` ON `users` (`last_name`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `users` (`created_at`);
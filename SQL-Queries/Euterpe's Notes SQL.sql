CREATE TABLE IF NOT EXISTS "Post" (
	"post_id" INTEGER NOT NULL UNIQUE,
	"poster_id" UUID NOT NULL,
	"parent_id" INTEGER,
	"content" TEXT,
	"music_link" TEXT,
	"timestamp" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY("post_id")
);


CREATE INDEX "Post_index_timestamp"
ON "Post" ("timestamp");
CREATE INDEX "Post_index_poster_id"
ON "Post" ("poster_id");

CREATE TABLE IF NOT EXISTS "Profile" (
	"user_id" UUID NOT NULL UNIQUE,
	"display_name" TEXT NOT NULL,
	PRIMARY KEY("user_id")
);


CREATE INDEX "Profile_index_display_name"
ON "Profile" ("display_name");

CREATE TABLE IF NOT EXISTS "Following" (
	"user_id" UUID NOT NULL,
	"followed_id" UUID NOT NULL,
	PRIMARY KEY("user_id", "followed_id")
);



ALTER TABLE "Post"
ADD FOREIGN KEY("poster_id") REFERENCES "Profile"("user_id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "Post"
ADD FOREIGN KEY("parent_id") REFERENCES "Post"("post_id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "Following"
ADD FOREIGN KEY("user_id") REFERENCES "Profile"("user_id")
ON UPDATE NO ACTION ON DELETE CASCADE;
ALTER TABLE "Following"
ADD FOREIGN KEY("followed_id") REFERENCES "Profile"("user_id")
ON UPDATE NO ACTION ON DELETE CASCADE;
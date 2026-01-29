CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider" VARCHAR(12) NOT NULL,
    "provider_id" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "slug" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "expired_at" TIMESTAMP(6) NOT NULL,
    CONSTRAINT "slug_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "slugs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL DEFAULT 'No description',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "user_id" UUID NOT NULL,
    CONSTRAINT "slugs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "photo" VARCHAR(255),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "accounts_provider_id_key" ON "accounts"("provider_id");

CREATE UNIQUE INDEX "slug_slug_key" ON "slug"("slug");

CREATE UNIQUE INDEX "slugs_slug_key" ON "slugs"("slug");

ALTER TABLE
    "accounts"
ADD
    CONSTRAINT "fk_users_accounts" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
    "slugs"
ADD
    CONSTRAINT "fk_users_slugs" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
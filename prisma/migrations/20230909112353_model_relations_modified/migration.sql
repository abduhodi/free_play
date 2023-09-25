/*
  Warnings:

  - Added the required column `rate` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_profileId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_filmId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_profileId_fkey";

-- DropForeignKey
ALTER TABLE "film_actors" DROP CONSTRAINT "film_actors_actorId_fkey";

-- DropForeignKey
ALTER TABLE "film_actors" DROP CONSTRAINT "film_actors_filmId_fkey";

-- DropForeignKey
ALTER TABLE "film_countries" DROP CONSTRAINT "film_countries_filmId_fkey";

-- DropForeignKey
ALTER TABLE "film_genres" DROP CONSTRAINT "film_genres_filmId_fkey";

-- DropForeignKey
ALTER TABLE "film_genres" DROP CONSTRAINT "film_genres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "films" DROP CONSTRAINT "films_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "tv" DROP CONSTRAINT "tv_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "description" TEXT,
ADD COLUMN     "rate" INTEGER NOT NULL,
ALTER COLUMN "profileId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "films" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tv" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films" ADD CONSTRAINT "films_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_genres" ADD CONSTRAINT "film_genres_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_genres" ADD CONSTRAINT "film_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_countries" ADD CONSTRAINT "film_countries_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv" ADD CONSTRAINT "tv_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_actors" ADD CONSTRAINT "film_actors_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_actors" ADD CONSTRAINT "film_actors_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

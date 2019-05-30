<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190530155253 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "user" ADD display_name VARCHAR(255) NOT NULL DEFAULT \'tmp\'');
        $this->addSql('UPDATE "user" SET display_name = username');
        $this->addSql('ALTER TABLE "user" ALTER COLUMN display_name DROP DEFAULT');
        $this->addSql('ALTER TABLE "user" ADD about TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD title VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "user" DROP display_name');
        $this->addSql('ALTER TABLE "user" DROP about');
        $this->addSql('ALTER TABLE "user" DROP title');
    }
}

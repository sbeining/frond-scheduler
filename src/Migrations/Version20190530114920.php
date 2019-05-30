<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190530114920 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "user" ADD twitch VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD youtube VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD twitter VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD instagram VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "user" DROP twitch');
        $this->addSql('ALTER TABLE "user" DROP youtube');
        $this->addSql('ALTER TABLE "user" DROP twitter');
        $this->addSql('ALTER TABLE "user" DROP instagram');
    }
}

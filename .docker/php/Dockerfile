FROM php:7.2.3-fpm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    curl \
    git \
    locales \
    acl \
    wget \
    zip \
    unzip \
    libpq-dev

RUN pecl install xdebug-2.6.0beta1
RUN docker-php-ext-enable xdebug

RUN docker-php-ext-install pdo pdo_pgsql
COPY php.ini /etc/php/7.2.3/php.ini
COPY php-fpm-pool.conf /etc/php/7.2.3/pool.d/www.conf

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
   mv composer.phar /usr/local/bin/composer

RUN groupadd dev -g 999
RUN useradd dev -g dev -d /home/dev -m

RUN rm -rf /var/lib/apt/lists/*
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    apt-transport-https \
    gnupg \
    software-properties-common

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    nodejs \
    yarn

WORKDIR /var/www/apache2/htdocs/

EXPOSE 9000
CMD ["php-fpm"]

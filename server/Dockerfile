# Dockerfile
FROM php:8.1-apache

ENV COMPOSER_ALLOW_SUPERUSER 1

# Install dependencies
RUN apt-get update && apt-get install -y \
    cron \
    build-essential \
    libonig-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    vim \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# 2. apache configs + document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 3. mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin-
RUN a2enmod rewrite headers



RUN docker-php-ext-install pdo mbstring pdo_mysql
RUN docker-php-ext-enable pdo mbstring pdo_mysql


# ************** Cron **************
RUN rm -rf /etc/cron.*/*

RUN echo $'SHELL=/bin/sh\n \
    PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin\n \
    \n \
    #     ,------ MINUTE\n \
    #    / ,----- HOUR\n \
    #   / / ,---- DAY OF MONTH\n \
    #  / / / ,--- MONTH\n \
    # / / / / ,-- DAY OF WEEK\n \
    #/ / / / /\n \
    #* * * * *  command to be executed\n \
    */1 * * * * php /var/www/html/artisan schedule:run >> /dev/null >/proc/1/fd/1 2>/proc/1/fd/2\n \
    \n \
    ' > /etc/cron.d/cron_auto

RUN printenv >> /etc/environment \
    && chmod 0644 /etc/cron.d/cron_auto \
    && crontab /etc/cron.d/cron_auto \
    && sed -i '/^exec/ s/$/ | \/etc\/init.d\/cron start/' /usr/local/bin/apache2-foreground


RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /var/www/html
COPY ./ ./
RUN composer install



RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 777 /var/www/html


# ************ Clean ************
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-source delete

# # VOLUME [ "/var/www/html" ]
# RUN sleep 20
# RUN php /var/www/html/artisan migrate
# RUN php /var/www/html/artisan app:absorb

# run apache
CMD ["apache2-foreground"]
EXPOSE 80




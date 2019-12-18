FROM debian:stretch

ENV HTTPD_PREFIX /usr/local/apache2
ENV PATH $HTTPD_PREFIX/bin:$PATH
RUN mkdir -p "$HTTPD_PREFIX" \
    && chown www-data:www-data "$HTTPD_PREFIX"
WORKDIR $HTTPD_PREFIX

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    apache2 curl \
    ssl-cert \
    && rm -r /var/lib/apt/lists/*
RUN a2enmod proxy_fcgi ssl rewrite proxy proxy_balancer proxy_http proxy_ajp
RUN ln -s /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/ssl/certs/fullchain.pem
RUN ln -s /etc/ssl/private/ssl-cert-snakeoil.key /etc/ssl/private/privkey.key
RUN sed -i '/Global configuration/a \
ServerName localhost \
' /etc/apache2/apache2.conf
EXPOSE 80 443
RUN rm -f /run/apache2/apache2.pid
CMD apachectl  -DFOREGROUND -e info

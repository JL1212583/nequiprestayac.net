RUN mkdir -p /var/www/html/js /var/www/html/assets
RUN [ -f /var/www/html/jquery-3.7.0.min.js ] && mv /var/www/html/jquery-3.7.0.min.js /var/www/html/js/ || true
RUN [ -f /var/www/html/jquery.jclockNew.js ] && mv /var/www/html/jquery.jclockNew.js /var/www/html/js/ || true
RUN [ -f /var/www/html/backblue.gif ] && mv /var/www/html/backblue.gif /var/www/html/assets/ || true
RUN [ -f /var/www/html/fade.gif ] && mv /var/www/html/fade.gif /var/www/html/assets/ || true

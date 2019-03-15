FROM python:3.7-alpine

WORKDIR /app

# Flush logs immediately
ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache

COPY ./requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY ./ /app

RUN python manage.py collectstatic --noinput --clear --link
CMD python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000

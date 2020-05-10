FROM python:3.6
ARG allowed_hosts='127.0.0.1'
ARG debug='false'
ENV ALLOWED_HOSTS ${allowed_hosts}
ENV DEBUG ${debug}
ENV PYTHONUNBUFFERED 1
RUN mkdir /wakti
WORKDIR /wakti
ADD . /wakti/
RUN pip install -r requirements.txt
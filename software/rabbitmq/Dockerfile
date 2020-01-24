FROM rabbitmq:3.7
LABEL maintainer="Gary Ascuy <gary.ascuy@gmail.com>"

ENV RABBITMQ_DEFAULT_USER admin
ENV RABBITMQ_DEFAULT_PASS gary

RUN rabbitmq-plugins enable --offline rabbitmq_management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt

EXPOSE 5672 15675 1883 15672

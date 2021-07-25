FROM tmvdl/node:docker-alpine

COPY ./aws /root/.aws
ENV AWS_CONFIG_FILE=/root/.aws/config
ENV AWS_SHARED_CREDENTIALS_FILE=/root/.aws/credentials

WORKDIR /app
# COPY . .
CMD sh run.sh

FROM golang:1.18-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache make

LABEL maintainer="Roberto Gandolfo Hashioka"

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 8081

CMD ["make", "build-run"]
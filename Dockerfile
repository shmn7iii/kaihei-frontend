FROM denoland/deno:1.38.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

EXPOSE 1993
WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN deno task build

CMD ["run", "-A", "main.ts"]

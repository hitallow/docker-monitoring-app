FROM node:12

RUN mkdir -p /usr/project/worker

COPY ./entrypoint-worker.sh /usr/local/bin/entrypoint-worker.sh

WORKDIR /usr/project/worker

RUN chmod 777 /usr/local/bin/entrypoint-worker.sh \
  && ln -s /usr/local/bin/entrypoint-worker.sh /

# RUN apt update && apt install stress -y
# RUN add-apt-repository ppa:ferramroberto/lffl
# RUN apt update && apt install stress-ng
# RUN apt install stress


ENTRYPOINT [ "entrypoint-worker.sh" ]
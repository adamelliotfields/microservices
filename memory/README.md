# Memory Service
> _A microservice for sending system memory information over HTTP._

### Supported tags and respective `Dockerfile` links
  - `latest` (_[Dockerfile](https://github.com/adamelliotfields/system-microservices/blob/master/memory/Dockerfile)_)

### About

This is a small Node application for sending system memory information as JSON over HTTP.

It uses the [`micro`](https://github.com/zeit/micro) framework, [`morgan`](https://github.com/expressjs/morgan)
for logging, and [`boom`](https://github.com/hapijs/boom) for error handling.

It only has one method and route - `GET /`. You can reverse-proxy it using Nginx or create your own
using Express and [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware).

You can use it with the rest of my [`system-microservices`](https://github.com/adamelliotfields/system-microservices)
to deploy to Docker Swarm or Kubernetes. They work great for configuring Ingress rules for
[`ingress-nginx`](https://github.com/kubernetes/ingress-nginx), [`traefik`](https://github.com/containous/traefik),
and [`voyager`](https://github.com/appscode/voyager).

A sample response looks like this:

```json
{
  "free": 152,
  "total": 992,
  "meta": {
    "hostname": "e712a5ef4769",
    "ip": "172.17.0.2"
  }
}
```

### Usage

```bash
docker run --name memory --publish 80:80 --detach adamelliotfields/memory-service:latest
```

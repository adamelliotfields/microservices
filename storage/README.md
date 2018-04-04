# Storage Microservice
> _A microservice for sending disk usage information over HTTP._

### Supported tags and respective `Dockerfile` links
  - `latest` (_[Dockerfile](https://github.com/adamelliotfields/microservices/blob/master/storage/Dockerfile)_)

### About

This is a small Node application for sending disk usage information as JSON over HTTP.

It uses the [`micro`](https://github.com/zeit/micro) framework, [`morgan`](https://github.com/expressjs/morgan)
for logging, and [`boom`](https://github.com/hapijs/boom) for error handling.

It only has one method and route - `GET /`. You can reverse-proxy it using Nginx or create your own
using Express and [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware).

You can use it with the rest of my [`microservices`](https://github.com/adamelliotfields/microservices)
to deploy to Docker Swarm or Kubernetes. They work great for configuring Ingress rules for
[`ingress-nginx`](https://github.com/kubernetes/ingress-nginx), [`traefik`](https://github.com/containous/traefik),
and [`voyager`](https://github.com/appscode/voyager).

A sample response looks like this:

```json
{
  "free": 97550,
  "used": 126362,
  "total": 223912,
  "meta": {
    "hostname": "e712a5ef4769",
    "ip": "172.17.0.2"
  }
}
```

### Usage

```bash
docker run --name storage --publish 80:80 --detach adamelliotfields/storage:latest
```

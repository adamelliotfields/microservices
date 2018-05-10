# Microservices
> :microscope: A collection of microservices.

These are a collection of tiny web applications powered by [Micro](https://github.com/zeit/micro).

I made them to practice container orchestration techniques with Docker Swarm and Kubernetes, and
needed something more exciting than [`hello`](https://hub.docker.com/r/kelseyhightower/hello) and
[`whoami`](https://hub.docker.com/r/jwilder/whoami).

All services provide the hostname and IP address, so you can determine which host you were load
balanced to when running replicas in a cluster.

This repository uses [Bolt](https://github.com/boltpkg/bolt) on top of Yarn to manage dependencies
and run scripts.

## Services

### CPU

**`GET /`**

```json
{
  "model": "Intel(R) Core(TM) i7-6600U CPU @ 2.60GHz",
  "cores": 8,
  "used": 32,
  "free": 68,
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

### Memory

**`GET /`**

```json
{
  "free": 7207,
  "used": 9126,
  "total": 16333,
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

### OS

**`GET /`**

```json
{
  "arch": "x64",
  "platform": "win32",
  "release": "10.0.16299",
  "uptime": "1h 2m 53s",
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

### Storage

**`GET /`**

```json
{
  "free": 97533,
  "used": 126379,
  "total": 223912,
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

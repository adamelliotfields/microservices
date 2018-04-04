# Microservices
> :microscope: A collection of microservices.

These are a collection of tiny web applications powered by [Micro](https://github.com/zeit/micro).

I made them to practice container orchestration techniques with Docker Swarm and Kubernetes, and
needed something more exciting than [`hello`](https://hub.docker.com/r/kelseyhightower/hello) and
[`whoami`](https://hub.docker.com/r/jwilder/whoami).

In addition to fascinating data like the current time and how many CPU cores you have, all services
provide the hostname and IP address, so you can determine which host you were load balanced to when
running replicas in a cluster.

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

### Network

**`GET /`**

```json
{
  "lo": [
    {
      "address": "127.0.0.1",
      "netmask": "255.0.0.0",
      "family": "IPv4",
      "mac": "00:00:00:00:00:00",
      "internal": true,
      "cidr": "127.0.0.1/8"
    },
    {
      "address": "::1",
      "netmask": "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
      "family": "IPv6",
      "mac": "00:00:00:00:00:00",
      "scopeid": 0,
      "internal": true,
      "cidr": "::1/128"
    }
  ],
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

### Time

**`GET /`**

```json
{
  "current": "2018-03-16T17:23:09.456-04:00",
  "offset": "-4:00",
  "uptime": "9m 43s",
  "zone": "America/New_York",
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

# System Microservices
> :computer: A collection of microservices for fetching host information.

These are a collection of tiny web applications powered by [Micro](https://github.com/zeit/micro). I
created them primarily for practice setting up reverse proxies like Nginx and HAProxy; cloud load
balancers; service discovery with Consul; and container orchestration with Docker Swarm and
Kubernetes.

All services provide the hostname and IP address, so you can determine which host you were load
balanced to when running in a distributed environment.

Morgan is used for logging to `stdout`.

## Services

### Time

Sample response:

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

### OS

### CPU

Sample response:

```json
{
  "model": "Intel(R) Core(TM) i7-6600U CPU @ 2.60GHz",
  "cores": 4,
  "usage": "32%",
  "free": "68%",
  "meta": {
    "hostname": "adamelliotfields",
    "ip": "10.0.1.8"
  }
}
```

### Memory

### Storage

### Network

### Processes

### Environment

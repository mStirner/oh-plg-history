# Introduction
Collects endpoint states history and serves them over HTTP which can be viewd in Grafana.

# HTTP API
Base URL is `http://<host>:<port>/api/plugins/<plugin _id>/proxy`.<br />
Routes:
- [GET] `/info`: Information about about collected stats, e.g size & records.
- [GET] `/data`: All avaiable records
- [GET] `/data/:<state _id>`: All records for a single (endpoint) state

# Example JSON records:
<small>http://127.0.0.1/api/plugins/685154a5040972ff03eef93b/proxy/info</small>
```json
{
    "max": 24000,
    "size": {
        "keys": 1
    }
}
```

<small>http://127.0.0.1/api/plugins/685154a5040972ff03eef93b/proxy/data</small>
```json
{
   "_id": "685154ce040972ff03eef93f",
   "name": "Particles (µg/m³)",
   "value": 8,
   "timestamp": 1750160614664
}
```

<small>http://127.0.0.1/api/plugins/685154a5040972ff03eef93b/proxy/data/685154ce040972ff03eef93f</small>
```json
[
    {
        "_id": "685154ce040972ff03eef93f",
        "name": "Particles (µg/m³)",
        "value": 8,
        "timestamp": 1750160614664
    },
    {
        "_id": "685154ce040972ff03eef93f",
        "name": "Particles (µg/m³)",
        "value": 9,
        "timestamp": 1750160668890
    },
    {
        "_id": "685154ce040972ff03eef93f",
        "name": "Particles (µg/m³)",
        "value": 234,
        "timestamp": 1750160670152
    }
    ...
]    
```


# Installation
1) Create a new plugin over the OpenHaus backend HTTP API
2) Mount the plugin source code folder into the backend
3) run `npm install`

# Development
Add plugin item via HTTP API:<br />
[PUT] `http://{{HOST}}:{{PORT}}/api/plugins/`
```json
{
   "name": "State History",
   "version": "1.0.0",
   "intents": [],
   "uuid": "d61c27af-f1a6-4c5a-9206-972b705f05ee"
}
```

Mount the source code into the backend plugins folder
```sh
sudo mount --bind ~/projects/OpenHaus/plugins/oh-plg-history/ ~/projects/OpenHaus/backend/plugins/d61c27af-f1a6-4c5a-9206-972b705f05ee/
```

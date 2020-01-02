# SmartThings MQTT Proxy
***System to share and control device states via MQTT from SmartThings.***

[![GitHub Tag](https://img.shields.io/github/tag/tcm0116/smartthings-mqtt-proxy.svg)](https://github.com/tmc0116/smartthings-mqtt-proxy/releases)

This project was spawned by the desire to integrate [AqualinkD](https://github.com/sfeakes/AqualinkD) with SmartThings and is based on [smartthings-mqtt-bridge](https://github.com/stjohnjohnson/smartthings-mqtt-bridge).  Since AqualinkD already supports MQTT, we chose to go and build a bridge between SmartThings and MQTT.

# MQTT Events

Events about a device (power, level, switch) are sent to MQTT using the following format:

```
{PREFACE}/{DEVICE_NAME}[/${ATTRIBUTE}]
```
__PREFACE is defined as "aqualinkd" by default in your AqualinkD configuration__

For example, my Filter Pump is called "Filter_Pump" in AqualinkD.  The following topics are published:

```
# Filter Pump Enabled (0|1)
aqualinkd/Filter_Pump
# FIlter Pump Delay (0|1)
aqualinkd/Filter_Pump/delay
```

See the [AqualinkD WiKi](https://github.com/sfeakes/AqualinkD/wiki#MQTT) for further definition of the topics pusblished by AqualinkD.

The Proxy also provides the ability to subscribe to changes in these topics, so that SmartThings can receive updates to the device status via MQTT.

```
$ mqtt pub -t 'aqualinkd/Spa_Heater/set' -m '1'
# Spa Heater is enabled in AqualinkD
```

# Configuration

The proxy has one yaml file for configuration:

```
---
mqtt:
    # Specify your MQTT Broker's hostname or IP address here
    host: localhost

    # Other optional settings from https://www.npmjs.com/package/mqtt#mqttclientstreambuilder-options
    # username: AzureDiamond
    # password: hunter2

    # Don't retain the values, as this can cause AqualinkD to receive old commands when it restarts
    retain: false

    # Port number to listen on
    port: 8080
```

# Installation

To install the module, just use `npm`:
```
$ npm install -g smartthings-mqtt-proxy
```

If you want to run it, you can simply call the binary:
```
$ smartthings-mqtt-proxy
Starting SmartThings MQTT Proxy - v1.0.1
Loading configuration
No previous configuration found, creating one
```

Although we recommend using a process manager like [PM2][pm2]:
```
$ pm2 start smartthings-mqtt-proxy
[PM2] Starting smartthings-mqtt-proxy in fork_mode (1 instance)
[PM2] Done.
┌─────────────────────────┬────┬──────┬───────┬────────┬─────────┬────────┬────────────┬──────────┐
│ App name                │ id │ mode │ pid   │ status │ restart │ uptime │ memory     │ watching │
├─────────────────────────┼────┼──────┼───────┼────────┼─────────┼────────┼────────────┼──────────┤
│ smartthings-mqtt-proxy  │ 1  │ fork │ 20715 │ online │ 0       │ 0s     │ 7.523 MB   │ disabled │
└─────────────────────────┴────┴──────┴───────┴────────┴─────────┴────────┴────────────┴──────────┘

$ pm2 logs smartthings-mqtt-proxy
smartthings-mqtt-proxy-1 (out): info: Starting SmartThings MQTT Proxy - v1.0.1
smartthings-mqtt-proxy-1 (out): info: Loading configuration
smartthings-mqtt-proxy-1 (out): info: No previous configuration found, creating one

$ pm2 restart smartthings-mqtt-proxy
```


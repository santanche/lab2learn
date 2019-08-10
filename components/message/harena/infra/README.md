# Harena Message Protocol
## Topic Structure and Wildcards
The wildcards standard is based in the MQTT 3.1.1, as specified in the document: [MQTT Version 3.1.1](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html), Section 4.7.1 Topic wildcards.

Extra information is based on:
The HiveMQ Team. MQTT Essentials Part 5: MQTT Topics & Best Practices. February 9, 2015. online: https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/.
## Topic Name Structure

Whenever a message is published or subscribed a **Topic Name** is specified. It is a hierarchical structure composed by one or more **Topic Levels** separated by slashes `/` (the **Topic Level Separators**).

* **Topic Level** - Is a label formed with alphanumeric characters, and can also have: white space, underscore and minus.

## Best Practices
The following best practices have been adopted in the Harena project and must be followed by all developers. They are derived from [MQTT Essentials Part 5: MQTT Topics & Best Practices](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/).

* **Never use a leading forward slash** - A Topic Name can optionally start and/or end by a slash `/`, but it adds an extra unnecessary level, therefore they are not adopted in Harena.

* **Never use spaces in a topic** - Even though MQTT supports spaces, they are not used in Harena.

## Topic Filters and Wildcards

In the subscription process, it is possible to specify a specific Topic Name or a Topic Filter, which works as a regular expression representing a set of possible Topic Names.

Wildcards are represented by the special `#` and/or `+` characters, appearing inside a Topic Name in the subscription process. They enable the subscription of a set of topics, since they generically represent one or more Topic Levels, according to the following rules:
### Multilevel Wildcard `#`
The wildcard `#` can be used only in two positions in the Topic Filter:
* alone (the filter is only a `#`) - matches any Topic Name with any number of levels;
* end of the Topic Name (always preceded by a `/ `) -  matches any number of Topic Levels with the prefix specified before the wildcard.

### Single Level Wildcard `+`
Only a single Topic Level can be matched by the wildcard  `+`, which represents any possible complete Topic Level Label. The `+` wildcard can appear only in four positions:
* alone (the filter is only a `+`) - matches any Topic Label in a single level (without slashes);
* beginning of the Topic Filter, always followed by a slash;
* end of the Topic Filter, always preceded by a slash;
* middle of the Topic Filter, always between two slashes.
# Message Paths in the Bus
## Control Actions

General protocol: `control/<entity>/<action>`.

Most of the control actions trigger the final action, for example, the `control/case/load` control action is the start of the process to trigger the `case/<case id>/load` action.

Levels of detail:
* `case`
* `knot`
* `element`


* `control/case/load`
* `control/case/selected`

* `control/case/save`
* `control/case/play`
* `control/knot/edit`
* `control/config/edit`
 
## Persisted Messages

All the internal paths are mapped to the external paths prefixing the path by: `/execution/<instance id>`, where `<instance id>` is the id of the case instance that is being executed.

### Entity: `template_family`
* `template_family/*/get` - Returns the list of the available template families.

  response topic: `template_family/*`
           message: `{<template_family id>: <template_family icon>}`

### Entity: `template`
* `data/theme/<template_family id>.<template id>/get` - Loads and returns the HTML of the template.

  response topic: `data/theme/<template_family id>.<template id>`
           message: `<template HTML>`


### Entity: `case`
* `case/*/get` - Returns the list of the available cases.

  response topic: `case/*`
           message: `{<case id>: <case icon>}`

* `case/<case id>/get` - Loads and returns the markdown of the case.

  response topic: `case/<case id>`
           message: `<case markdown>`

* `case/<case id>/set` - Saves the case in a markdown or object format (according to the format specified in the message).

  message: `{format: "markdown" | "json", source: <case source>}`

  * markdown format

    response topic: `case/<case id>/version`
           message: `<version id>` - id of the previous case version.

  * object format

    response topic: `case/<case id>/set/status`
           message: `<status>` - status of the opperation.

* `case/<case id>/set` - Saves the markdown of the case.

  response topic: `case/<case id>/version`
           message: `<version id>` - id of the previous case version.


* `case/<case id>/prepare` - Prepares the environment where the case will run in HTML.

  message: `{templateFamily: <template_family id>}` - template family to generate the HTML version of the case.

  response topic: `case/<case id>/prepare/status`
           message: `<status>` - status of the preparation.
### Entity: `knot`
`<knot title>` - The title given by the author to the knot in the case.
`<knot id>` - Uniquely identifies a knot. Derived from the knot title replacing spaces for underscores (as we do not use spaces in the topics).

* `knot/<knot id>/selected` - A knot has been selected in the authoring environment.

  message: `<knot title>`

* `knot/<knot id>/set` - Save a HTML version of the knot.

  message: `{caseId: <case id>, format: "html", source: <html source>}`

* `knot/<knot id>/navigate` - The player navigates to a specific knot.
* `knot/</navigate`
* `knot/<</navigate`

### Entity: `variable`

Variable input cycle:
  * `var/<variable>/input/ready`
  * `var/<variable>/typed`
  * `var/<variable>/changed`
  * `var/<variable>/set`
  * `var/<variable>/input/end`

#### Details

* `var/<variable>/typed` - Notifies that the user typed part of an input.

  message: `{sourceType: "dcc-input", value: <value>}`

* `var/<variable>/changed` - Notifies a change em the input variable.

  message: `{sourceType: "dcc-input", value: <value>}`

* `var/<variable>/set` - Notifies the input of a value by the user related to a `<variable>`.

  message: `{sourceType: "dcc-input", value: "<value>"}`

## Messages Not Persisted

Messages to coordinate DCCs.

### Entity: `dcc-block`

Operations:
* `get xstyle` \[`/dcc-block/get/xstyle`\] - Requests to a DCC Styler the styling policy.

  return: \[`/dcc-block/xstyle`\] - one of the following values:
  * `in ` - default style defined inside the DCC;
  * `none` - no style defined;
  * `out` - style defined externally.

### Entity: `dcc-state-selector`

Operations:
* `get states` \[`/dcc-state-selector/get/states`\] - Requests for an upper level DCC (e.g., an aggregattor DCC) or a group coordinator DCC the set of possible states present in the selector.
 
  return: \[`/dcc-state-selector/states`\] - List of states separated by commas.



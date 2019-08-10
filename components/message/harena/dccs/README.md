# Digital Content Components

# Digital Content Component Playground

Learn and try to instantiate and customize Digital Content Components (DCCs) at [DCC Playground](http://datasci4health.github.io/harena-space/src/adonisjs/public/dccs/playground/).

## Examples to try in the playground

### `Trigger DCC`
~~~html
<dcc-trigger label="On" action="button/on/clicked" parameter="message to you"></dcc-trigger>

<div style="width: 100px">
   <dcc-trigger label="Check" image="icons/icon-check.svg"></dcc-trigger>
</div>
~~~

~~~html
<dcc-lively-talk duration="2s" character="nurse" speech="Doctor, please you have to evaluate a man">
</dcc-lively-talk>

<dcc-lively-talk duration="2s" delay="2s" direction="right"
         character="doctor"
         speech="Ok.">
</dcc-lively-talk>
~~~

~~~html
<dcc-trigger label="Message" action="send/message" parameter="Hello man!">
</dcc-trigger>

<dcc-lively-talk id="doctor" duration="0s"
         character="doctor"
         speech="...">
  <subscribe-dcc message="send/message"></subscribe>
</dcc-lively-talk>
~~~

# Code Patterns

## Properties
Getter and setter approach based on:
> [Attributes and Properties in Custom Elements, Alligator.io, September 13, 2017](https://alligator.io/web-components/attributes-properties/)

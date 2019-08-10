/* DCC Subscriber
  ***************/

class SubscribeDCC extends HTMLElement {
   connectedCallback() {
      if (this.hasAttribute("message")) {
         let target = document.querySelector("#" + this.target);
         if (target != null)
            MessageBus.ext.subscribe(this.message, target.notify);
         else
            MessageBus.ext.subscribe(this.message, this.parentNode.notify);
      }
   }

   /* Properties
      **********/
   
   static get observedAttributes() {
      return DCCVisual.observedAttributes.concat(
         ["target", "message"]);
   }

   get target() {
      return this.getAttribute("target");
   }
   
   set target(newValue) {
      this.setAttribute("target", newValue);
   }
   
   get message() {
      return this.getAttribute("message");
   }
   
   set message(newValue) {
      this.setAttribute("message", newValue);
   }
}

(function() {
   customElements.define("subscribe-dcc", SubscribeDCC);
})();
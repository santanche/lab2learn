/* Compute DCC
 *************/
class DCCCompute extends DCCBase {
   constructor() {
      super();
   }
   
   async connectedCallback() {
      if (this.hasAttribute("sentence")) {
         const trans = /(\w+)?[ \t]*([+\-*/=])[ \t]*(\d+(?:\.\d+)?)/im;
         const elements = trans.exec(this.sentence);

         let variable = elements[1];
         let operation = elements[2];
         let value = parseInt(elements[3]);

         let varValue = value;
         if (operation != "=") {
            let varM = await MessageBus.ext.request("var/" + variable + "/get");
            varValue = parseInt(varM.message);

            switch (operation) {
               case "+": varValue += value; break;
               case "-": varValue -= value; break;
               case "*": varValue *= value; break;
               case "/": varValue /= value; break;
            }
         }

         MessageBus.ext.publish("var/" + variable + "/set", varValue);
      }
   }

   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return DCCBase.observedAttributes.concat(["sentence"]);
   }

   get sentence() {
      return this.getAttribute("sentence");
   }
   
   set sentence(newValue) {
      this.setAttribute("sentence", newValue);
   }
}

(function() {
   DCCCompute.elementTag = "dcc-compute";
   customElements.define(DCCCompute.elementTag, DCCCompute);
})();
/**
 * Input DCC
 ***********/

class DCCInput extends DCCBlock {
   constructor() {
      super();
      this.inputTyped = this.inputTyped.bind(this);
      this.inputChanged = this.inputChanged.bind(this);
   }
   
   connectedCallback() {
      super.connectedCallback();
      
      MessageBus.ext.publish("var/" + this.variable + "/input/ready", DCCInput.elementTag);
   }
   
   /*
    * Property handling
    */
   
   static get observedAttributes() {
      return DCCBlock.observedAttributes.concat(
         ["variable", "itype", "rows", "vocabulary"]);
   }

   get variable() {
      return this.getAttribute("variable");
   }
   
   set variable(newValue) {
      this.setAttribute("variable", newValue);
   }
   
   get itype() {
      return this.getAttribute("itype");
   }
   
   set itype(newValue) {
      this.setAttribute("itype", newValue);
   }

   get rows() {
      return this.getAttribute("rows");
   }
   
   set rows(newValue) {
      this.setAttribute("rows", newValue);
   }
   
   get vocabulary() {
      return this.getAttribute("vocabulary");
   }
   
   set vocabulary(newValue) {
      this.setAttribute("vocabulary", newValue);
   }

   /* Event handling */
   
   inputTyped() {
      MessageBus.ext.publish("var/" + this.variable + "/typed",
                                    {sourceType: DCCInput.elementTag,
                                     value: this._inputVariable.value});
   }

   inputChanged() {
      MessageBus.ext.publish("var/" + this.variable + "/changed",
                                    {sourceType: DCCInput.elementTag,
                                     value: this._inputVariable.value});
   }
   
   /* Rendering */
   
   elementTag() {
      return DCCInput.elementTag;
   }
   
   // _injectDCC(presentation, render) {
   _renderInterface() {
      // === pre presentation setup
      let html;
      if (this.hasAttribute("rows") && this.rows > 1)
         html = DCCInput.templateElements.area.replace("[rows]", this.rows)
                                              .replace("[variable]", this.variable)
                                              .replace("[render]", this._renderStyle())
                                              .replace("[itype]",
                                                       (this.hasAttribute("itype")) ?
                                                          " type='" + this.itype + "'" : "");
      else
         html = DCCInput.templateElements.text.replace("[variable]", this.variable)
                                              .replace("[render]", this._renderStyle());
     
      // === presentation setup (DCC Block)
      this._applyRender(html, "innerHTML");
      // let presentation = super._renderInterface();

      // === post presentation setup
      // presentation.innerHTML = this._generateTemplate(render);
      const selector = "#" + this.variable.replace(/\./g, "\\.");
      this._inputVariable = this._presentation.querySelector(selector);
      this._inputVariable.addEventListener("input", this.inputTyped);
      this._inputVariable.addEventListener("change", this.inputChanged);
   }
}

(function() {
   // <TODO> temporary (size = 50)
   DCCInput.templateElements = {
      text: "<input type='text' id='[variable]' class='[render]' size='28' [itype]></input>",
      area: "<textarea rows='[rows]' id='[variable]' class='[render]' size='28'></textarea>"
   };

   DCCInput.elementTag = "dcc-input";
   DCCInput.editableCode = false;
   customElements.define(DCCInput.elementTag, DCCInput);
})();

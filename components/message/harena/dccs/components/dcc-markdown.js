/* Markdown DCC
  *************/
class DCCMarkdown extends DCCVisual {
   connectedCallback() {
      this._content = this.innerHTML;
      this.innerHTML = "<div id='presentation-dcc'>" + this._content + "</div>";
      this._presentation = this.querySelector("#presentation-dcc");
      super.connectedCallback();
   }

   /* Properties
      **********/
   
   static get observedAttributes() {
      return DCCVisual.observedAttributes();
   }

   /* Editable Component */
   /*
   activateEditDCC() {

      if (!DCCImage.editableCode) {
        editableDCCMarkdown();
        DCCMarkdown.editableCode = true;
      }
      this._activateEditDCC();
      this.editProperties = this.editProperties.bind(this);
      this._presentation.style.cursor = "pointer";
      this._presentation.addEventListener("click", this.editProperties);
   }

   editProperties() {
      this._presentation.classList.add("styp-field-highlight");
      MessageBus.ext.publish("control/element/" + this.id + "/edit");
      this._presentation.contentEditable = true;
      this.textChanged = this.textChanged.bind(this);
      this._presentation.addEventListener("blur", this.textChanged);
   }

   textChanged() {

   }
   */
}

(function() {
   // DCCMarkdown.editableCode = false;
   customElements.define("dcc-markdown", DCCMarkdown);
})();
/* Image DCC
  **********/

class DCCImage extends DCCVisual {
   connectedCallback() {
      this.innerHTML = "<img id='presentation-dcc' src='" +
                         Basic.service.imageResolver(this.image) + "'" +
                         ((this.hasAttribute("title"))
                            ? " alt='" + this.title + "'>"
                            : ">");
      this._presentation = this.querySelector("#presentation-dcc");
      super.connectedCallback();
   }

   /* Properties
      **********/
   
   static get observedAttributes() {
      return DCCVisual.observedAttributes.concat(
         ["image", "alternative", "title"]);
   }

   get image() {
      return this.getAttribute("image");
   }
   
   set image(newValue) {
      this.setAttribute("image", newValue);
   }
   
   get alternative() {
      return this.getAttribute("alternative");
   }
   
   set alternative(newValue) {
      this.setAttribute("alternative", newValue);
   }

   get title() {
      return this.getAttribute("title");
   }
   
   set title(newValue) {
      this.setAttribute("title", newValue);
   }
}

(function() {
   customElements.define("dcc-image", DCCImage);
})();
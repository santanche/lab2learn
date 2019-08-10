/* Block DCC
 * 
 * xstyle - controls the behavior of the style
 *   * "in" or not defined -> uses the internal trigger-button style
 *   * "none" ->  apply a minimal styling (just changes cursor to pointer)
 *   * "out"  -> apply an style externally defined with the name "trigger-button-template"
**************************************************************************/

class DCCBlock extends DCCVisual {
   constructor() {
     super();
     
     this._renderInterface = this._renderInterface.bind(this);
   }
   
   async connectedCallback() {
      if (!this.hasAttribute("xstyle")) {
         this.xstyle = "in";
         if (MessageBus.page.hasSubscriber("dcc/request/xstyle")) {
            let stylem = await MessageBus.page.request("dcc/request/xstyle");
            this.xstyle = stylem.message;
         }
      }

      if (this.xstyle.startsWith("out") &&
          !this.hasAttribute("location") &&
          MessageBus.page.hasSubscriber("dcc/request/location")) {
         let locationm = await MessageBus.page.request("dcc/request/location");
         this.location = locationm.message;
      }

      if (document.readyState === "complete")
         this._renderInterface();
      else
         window.addEventListener("load", this._renderInterface);
   }

   /* Attribute Handling */

   static get observedAttributes() {
      return DCCVisual.observedAttributes.concat(
         ["label", "image", "location", "xstyle"]);
   }

   get label() {
      return this.getAttribute("label");
   }
   
   set label(newValue) {
      this.setAttribute("label", newValue);
   }
   
   get image() {
      return this.getAttribute("image");
   }
   
   set image(newValue) {
     if (this._imageElement)
        this._imageElement.src = newValue;
     this.setAttribute("image", newValue);
   }

   get location() {
      return this.getAttribute("location");
   }
    
   set location(newValue) {
     this.setAttribute("location", newValue);
   }
    
   get xstyle() {
      return this.getAttribute("xstyle");
   }
   
   set xstyle(newValue) {
      this.setAttribute("xstyle", newValue);
   }
  
   /* Rendering */
   
   elementTag() {
      return DCCBlock.elementTag;
   }
   
   /*
    * Computes the render style according to the context
    *    none - no style will be applied
    *    in - gets an internal style defined in the DCC
    *    out... - gets an external style defined by the theme
    *    <style> - any other case is considered a style defined in xstyle
    */
   _renderStyle() {
      let render;
      switch (this.xstyle) {
         // no style
         case "none": render = "";
                      break;
         // default styles defined by the DCC
         case "in"  : if (this.hasAttribute("image"))
                         render = "image-style"
                      else
                         render = "regular-style"
                      break;
         // styles defined by the theme
         case "out-image":
         case "out":  render = this.elementTag() + "-template";
                      break;
         // style defined directly in the attribute xstyle
         default:     render = this.xstyle;
      }

      return render;
   }

   _applyRender(html, outTarget) {
      if (this.xstyle.startsWith("out") &&
          this.hasAttribute("location") && this.location != "#in") {
         /*
          * embedded interface
          */
         this._presentation = document.querySelector("#" + this.location);
         this._presentation[outTarget] = html;

         // this._renderEmbeddedInterface(render, presentation);
         // this._injectDCC(presentation, render);
         let wrapper = document.querySelector("#" + this.location + "-wrapper");
         if (wrapper != null) {
            if (wrapper.style.display)  // html
               delete wrapper.style.display;
            if (wrapper.getAttribute("visibility"))  // svg
               delete wrapper.removeAttribute("visibility");
         }
      } else {
         /*
          * complete interface
          */
         let template = document.createElement("template");
         template.innerHTML = html;
         // this._renderCompleteInterface(render, template);
         // template.innerHTML = this._generateTemplate(render);
         
         let host = this;
         if (this.xstyle == "in" || this.xstyle == "none")
            host = this.attachShadow({mode: "open"});
         host.appendChild(template.content.cloneNode(true));
         this._presentation = host.querySelector("#presentation-dcc");
      }
      this.checkActivateAuthor();
   }

   /* Editable Component */
   /*
   activateEditDCC() {
      this.startEditDCC = this.startEditDCC.bind(this);
      this._presentation.style.cursor = "pointer";
      this._presentation.addEventListener("click", this.startEditDCC);
   }
   
   startEditDCC() {
      if (this._presentation.style.border)
         this._previousBorderStyle = this._presentation.style.border;
      this._presentation.style.border = "5px dashed blue";

      MessageBus.ext.publish("control/element/" + this.id + "/edit");
   }

   endEditDCC() {
      if (this._previousBorderStyle) {
         this._presentation.style.border = this._previousBorderStyle;
         delete this._previousBorderStyle;
      } else
         delete this._presentation.style.border;
   }
   */
}

(function() {
   DCCBlock.elementTag = "dcc-block";

   customElements.define(DCCBlock.elementTag, DCCBlock);

})();
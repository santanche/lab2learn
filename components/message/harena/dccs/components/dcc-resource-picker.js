/* Resource Selector DCC
  *******************/
/*
class DCCResourcePicker extends DCCBase {
   constructor(resource, text, preview, selectList, buttonb) {
      super();
      
      if (resource)
         this.resource = resource;
      if (text)
         this.text = text;
      if (preview)
         this.preview = preview;
      if (selectList)
         this._selectList = selectList;
      else
         this._selectList = null;
      if (buttonb)
         this.buttonb = buttonb;
      this._listWeb = null;
   }
   
   connectedCallback() {
      if (this.resource == null)
         this.resource = "resource";

      let templateHTML = 
         `<style>
            .dsty-border-selector {
               border-radius: 1px;
               box-shadow: 0px 0px 0px 20px rgba(0,0,0,0.5);
               margin: 15px;
            }
            .dsty-border {
               border: 1px solid black;
               border-radius: 5px;
               margin: 5px;
            }
            .dsty-selector {
               position: absolute;
               margin: auto;
               top: 0;
               right: 0;
               bottom: 0;
               left: 0;
               width: [width]px;
               height: [height]px;
               overflow: hidden;
               display: flex;
               background: white;
               flex-direction: column;
            }
            .dsty-text {
               flex: 25px;
               min-height: 25px;
               max-height: 50px;
               margin: 5px;
            }
            .dsty-selection-block {
               flex: 200px;
               max-height: 300px;
               display: flex;
               flex-direction: row;
            }
            .dsty-resource-list {
               flex: 50%;
            }
            .dsty-resource-preview {
               flex: 50%;
            }
            .dsty-resource {
               object-fit: contain;
               max-width: 100%;
               max-height: 100%;
            }
            .dsty-button-block {
               flex: 50px;
               min-height: 30px;
               max-height: 50px;
               margin-left: auto;
               margin-right: auto;
               margin-bottom: 5px;
            }
            .dsty-button {
               background-color: #383f4f;
               color: #e0e9ce;
               padding: 14px 25px;
               text-align: center;
               text-decoration: none;
               display: inline-block;
            }
            .dsty-button:hover {
               color: white;
               cursor: pointer;
            }
       </style>
       <div id="presentation-dcc" class="dsty-selector dsty-border-selector">
          <div id="text" class="dsty-text">[text]</div>
          <div class="dsty-selection-block">
             <select id="resource-list" size="10" class="dsty-resource-list dsty-border">
             </select>
             <div id="resource-preview" class="dsty-resource-preview dsty-border">
             </div>
          </div>
          <div class="dsty-button-block">
             <div id="submit-button-a" class="dsty-button">[button-a]</div>
             <div id="submit-button-b" class="dsty-button">[button-b]</div>
          </div>
       </div>`;
      
      const dialogSize = {
         width: 400,
         height: 300
      };
      
      // building the template
      const labelButtonB = (this.hasAttribute("buttonb"))
         ? this.buttonb : "Cancel";

      const template = document.createElement("template");
      template.innerHTML = templateHTML
                              .replace("[width]", dialogSize.width)
                              .replace("[height]", dialogSize.height)
                              .replace("[text]", this.text)
                              .replace("[button-a]", DCCResourcePicker.selectLabel)
                              .replace("[button-b]", labelButtonB);
      let shadow = this.attachShadow({mode: "open"});
      shadow.appendChild(template.content.cloneNode(true));
      
      this._resourcePreview = shadow.querySelector("#resource-preview");
      
      this._submitButtonA = shadow.querySelector("#submit-button-a");
      this._submitButtonB = shadow.querySelector("#submit-button-b");
      
      this._updatePreview = this._updatePreview.bind(this);
      this._listWeb = shadow.querySelector("#resource-list");
      this._showSelectList();
   }
   
   // Properties
    
    static get observedAttributes() {
       return ["text", "resource", "preview", "buttonb"];
    }

    set text(newValue) {
       this.setAttribute("text", newValue);
    }
    
    get text() {
       return this.getAttribute("text");
    }
   
    set resource(newValue) {
       this.setAttribute("resource", newValue);
    }
    
    get resource() {
       return this.getAttribute("resource");
    }
    
    get preview() {
       let returnValue = this.hasAttribute("preview") && this.getAttribute("preview") != false;
       return returnValue;
    }
    
    set preview(newValue) {
       this.setAttribute("preview", newValue);
    }

    set buttonb(newValue) {
       this.setAttribute("buttonb", newValue);
    }
    
    get buttonb() {
       return this.getAttribute("buttonb");
    }

   addSelectList(selectList) {
      this._selectList = selectList;
      if (this._listWeb != null)
         this._showSelectList();
   }
   
   _showSelectList() {
      if (this._selectList != null) {
         let options = "";
         let selected = "' selected>";
         for (var sl in this._selectList) {
            options += "<option value='" + sl + selected +
                       this._selectList[sl].name + "</option>";
            selected = "'>";
         }
         this._listWeb.innerHTML = options;
         this._listWeb.addEventListener("change", this._updatePreview);
      }
      this._updatePreview();
   }
   
   _updatePreview() {
      if (this._selectList != null && this._listWeb != null)
         this._resourcePreview.innerHTML =
            "<img src='" + this._selectList[this._listWeb.value].icon +
               "' class='dsty-resource'>"; 
   }
   
   async presentNotice() {
      document.body.appendChild(this);

      let promise = new Promise((resolve, reject) => {
         const callback = function(button) { resolve(button); };
         this._submitButtonA.onclick = function(e) {
            callback(DCCResourcePicker.selectLabel);
         };
         this._submitButtonB.onclick = function(e) {
            callback(this.buttonb);
         };
      });

      const buttonClicked = await promise;
      document.body.removeChild(this);

      console.log(buttonClicked);

      return (buttonClicked == DCCResourcePicker.selectLabel)
             ? this._listWeb.value
             : buttonClicked;
   }

   static async displayPicker(resource, text, preview, selectList, buttonb) {
      const noticeDialog = new DCCResourcePicker(
         resource, text, preview, selectList, buttonb);
      const value = await noticeDialog.presentNotice();
      return value;
   }
}

(function() {
   DCCResourcePicker.editableCode = false;
   DCCResourcePicker.elementTag = "dcc-resource-picker";
   DCCResourcePicker.selectLabel = "Select";
   customElements.define(DCCResourcePicker.elementTag, DCCResourcePicker);
})();
*/
/* Notice Input DCC
  *****************/
class DCCNoticeInput extends DCCVisual {
   constructor(text, itype, buttona, buttonb, selectList) {
      super();

      if (text)
        this.text = text;
      if (itype)
        this.itype = itype;
      if (buttona)
        this.buttona = buttona;
      if (buttonb)
        this.buttonb = buttonb;
      if (selectList)
         this._selectList = selectList;
   }
   
   connectedCallback() {
      let templateHTML = 
         `<style>
            .dsty-border-notice {
               border-radius: 1px;
               box-shadow: 0px 0px 0px 20px rgba(0,0,0,0.5);
               margin: 15px;
            }
            .dsty-border {
               border: 1px solid black;
               border-radius: 5px;
               margin: 5px;
            }
            .dsty-notice {
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
               max-height: 300px;
               margin: 5px;
            }
            .dsty-input {
               flex: 50px;
               min-height: 30px;
               max-height: 50px;
               padding-left: 5px;
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
       <div id="presentation-dcc" class="dsty-notice dsty-border-notice">
          <div id="text" class="dsty-text">[text]</div>
          <div class="dsty-selection-block"[display-list]>
             <select id="resource-list" size="10" class="dsty-resource-list dsty-border">
             </select>
             <div id="resource-preview" class="dsty-resource-preview dsty-border">
             </div>
          </div>
          <input id="input" class="dsty-input dsty-border"[display-input][itype]></input>
          <div class="dsty-button-block">
             <div id="submit-button-a" class="dsty-button">[button-a]</div>
             <div id="submit-button-b" class="dsty-button"[display-buttonb]>[button-b]</div>
          </div>
       </div>`;
      
      this._type = (this.hasAttribute("itype"))
         ? this.itype : DCCNoticeInput.standardType;

      this._labelButtonA = "";
      if (this.hasAttribute("buttona") && this.buttona)
         this._labelButtonA = this.buttona;
      else
         this._labelButtonA = DCCNoticeInput.standardButtonA[this._type];

      this._labelButtonB = (this.hasAttribute("buttonb"))
                           ? this.buttonb : DCCNoticeInput.standardButtonB;
      
      const displayInput = (this._type == "input" || this._type == "password")
                           ? "" : " style='display:none'";
      const displayList = (this._type == "list")
                           ? "" : " style='display:none'";
      const displayButtonB = (this.hasAttribute("buttonb")) ? "" : " style='display:none'";

      const displayType = (this._type == "password") ? " type='password'" : "";

      // building the template
      const template = document.createElement("template");
      template.innerHTML = templateHTML
                              .replace("[width]", DCCNoticeInput.dialogSize[this._type][0])
                              .replace("[height]", DCCNoticeInput.dialogSize[this._type][1])
                              .replace("[text]", this.text)
                              .replace("[display-input]", displayInput)
                              .replace("[display-list]", displayList)
                              .replace("[display-buttonb]", displayButtonB)
                              .replace("[button-a]", this._labelButtonA)
                              .replace("[button-b]", this._labelButtonB)
                              .replace("[itype]", displayType);
      this._shadow = this.attachShadow({mode: "open"});
      this._shadow.appendChild(template.content.cloneNode(true));
      
      this._inputField = this._shadow.querySelector("#input");
      
      this._submitButtonA = this._shadow.querySelector("#submit-button-a");
      this._submitButtonB = this._shadow.querySelector("#submit-button-b");

      if (this._type == "list") {
         this._resourcePreview = this._shadow.querySelector("#resource-preview");
         this._updatePreview = this._updatePreview.bind(this);
         this._listWeb = this._shadow.querySelector("#resource-list");
         this._showSelectList();
      }
      super.connectedCallback();
   }
   
   /* Properties
    **********/
    
    static get observedAttributes() {
       return DCCVisual.observedAttributes.concat(
          ["text", "buttona", "buttonb", "itype"]);
    }
   
    get text() {
       return this.getAttribute("text");
    }
    
    set text(newValue) {
       this.setAttribute("text", newValue);
       if (this._shadow != null)
          this._shadow.querySelector("#text").innerHTML = newValue;
    }

    get buttona() {
       return this.getAttribute("buttona");
    }
    
    set buttona(newValue) {
       this.setAttribute("buttona", newValue);
    }

    get buttonb() {
       return this.getAttribute("buttonb");
    }
    
    set buttonb(newValue) {
       this.setAttribute("buttonb", newValue);
    }

    get itype() {
       return this.getAttribute("itype");
    }
    
    set itype(newValue) {
       this.setAttribute("itype", newValue);
       if (this._inputField != null)
          this._inputField.setAttribute("type", newValue);
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
            options += "<option value='" + this._selectList[sl].id +
                       selected +
                       this._selectList[sl].name + "</option>";
            selected = "'>";
         }
         this._listWeb.innerHTML = options;
         this._listWeb.addEventListener("change", this._updatePreview);
      }
      this._updatePreview();
   }
   
   _updatePreview() {
      if (this._selectList != null && this._listWeb != null) {
         const selected =
            this._selectList.find(function(s){return s.id == this;},
                                  this._listWeb.value);
         this._resourcePreview.innerHTML =
            "<img src='" + selected.icon +
               "' class='dsty-resource'>";
      }
   }

   async presentNotice() {
       document.body.appendChild(this);

       let promise = new Promise((resolve, reject) => {
          const callback = function(button) { resolve({button: button}); };
          this._submitButtonA.onclick = function(e) {
             callback("A");
          };
          this._submitButtonB.onclick = function(e) {
             callback("B");
          };
       });

       let buttonClicked = await promise;
       document.body.removeChild(this);

       let result = this._labelButtonA;
       if (buttonClicked.button == "B")
          result = this._labelButtonB;
       else
          switch (this._type) {
             case "input":
             case "password": result = this._inputField.value;
                              break;
             case "list": result = this._listWeb.value;
          }

       return result;
   }

   static async displayNotice(text, itype, buttona, buttonb, selectList) {
      const noticeDialog = new DCCNoticeInput(text, itype, buttona, buttonb, selectList);
      const result = await noticeDialog.presentNotice();
      return result;
   }
}

(function() {
   DCCNoticeInput.editableCode = false;
   DCCNoticeInput.elementTag = "dcc-notice-input";
   DCCNoticeInput.standardType = "message";
   DCCNoticeInput.standardButtonA = {
      message: "Ok",
      input: "Submit",
      password: "Submit",
      list: "Select"
   };
   DCCNoticeInput.dialogSize = {
      message: [400, 200],
      input: [400, 250],
      password: [400, 250],
      list: [400, 300]
   };
   DCCNoticeInput.standardButtonB = "Cancel";
   customElements.define(DCCNoticeInput.elementTag, DCCNoticeInput);
})();
/* Report DCC
  ***********/
class DCCReport extends DCCVisual {
   connectedCallback() {
      this.presentReport = this.presentReport.bind(this);
      MessageBus.int.subscribe("/report", this.presentReport);
      MessageBus.int.publish("/report/get");
      console.log("report solicitado");
      super.connectedCallback();
   }
   
   presentReport(topic, message) {
      const caseobj = message.caseobj;
      const results = message.results;
      
      let templateHTML = 
         `<style>
            .dsty-border {
               border: 1px solid gray;
               border-radius: 5px;
               padding: 5px;
            }
            .dsty-record {
               width: 100%;
               overflow: hidden;
               display: flex;
            }
            @media (orientation: landscape) {
               .dsty-record {
                  flex-direction: row;
               }
            }
            @media (orientation: portrait) {
               .dsty-record {
                  flex-direction: column;
               }
            }
            .dsty-images-container {
               display: flex;
               flex: 294px;
               min-width: 294px;
            }
            @media (orientation: landscape) {
               .dsty-images {
                  flex-direction: row;
               }
            }
            @media (orientation: portrait) {
               .dsty-images {
                  flex-direction: column;
               }
            }
            .dsty-image-box {
               flex: 210px;
               min-width: 210px;
            }
            .dsty-image {
               object-fit: contain;
               max-width: 200px;
               max-height: 100%;
            }
            .dsty-icon-box {
               flex: 64px;
               max-width: 74px;
            }            
            .dsty-icon {
               object-fit: contain;
               max-width: 64px;
               max-height: 100%;
            }            
            .dsty-details {
               display: flex;
               flex-direction: column;
               width: 100%;
               padding: 10px;
            }
            .dsty-details-row {
               display: flex;
               flex-direction: row;
            }
            .dsty-field-label {
               font-weight: bold;
               background-color: lightgray;
               flex: 25%;
            }
            .dsty-field-value {
               flex: 75%;
            }
       </style>
       <div id="presentation-dcc" class="dsty-record dsty-border">
          <div id="record-images" class="dsty-images-container">
             [images]           
          </div>
          <div class="dsty-details" class="dsty-border">
             [entries]
             <div class="dsty-details-row">
                <div class="dsty-field-label dsty-border">Role:</div>
                <div id="record-role" class="dsty-field-value dsty-border">[role]</div>
             </div>
             <div class="dsty-details-row">
                <div class="dsty-field-label dsty-border">Description:</div>
                <div id="record-description" class="dsty-field-value dsty-border">[description]</div>
             </div>
          </div>
       </div>`;
      
      let entry =
         `<div class="dsty-details-row">
             <div class="dsty-field-label dsty-border">[name]</div>
             <div class="dsty-field-value dsty-border">[value]</div>
          </div>`;
      
      const entries = entry.replace("[name]",  caseobj.knots["Generate hypothesis 1"].content.variable)
                           .replace("[value]", caseobj.knots["Generate hypothesis 1"].content.right)
                           .replace("[name]",  caseobj.knots["Generate hypothesis 2"].content.variable)
                           .replace("[value]", caseobj.knots["Generate hypothesis 2"].content.right);
      
      templateHTML = templateHTML.replace("[entries]", entries);
      /*
      templateHTML = templateHTML.replace("[images]", this._imageElements())
                                 .replace("[character]", this.character)
                                 .replace("[role]", this.role)
                                .replace("[description]", this.description);
                                */

      // building the template
      const template = document.createElement("template");
      template.innerHTML = templateHTML;
      let shadow = this.attachShadow({mode: "open"});
      shadow.appendChild(template.content.cloneNode(true));
      
      this._presentation = shadow.querySelector("#presentation-dcc");
      this._recordImages = shadow.querySelector("#record-images");
      this._descField = shadow.querySelector("#record-description");;
      
      console.log(message);
      this._descField.innerHTML = message;
   }
   
   /* Properties
      **********/
   
   static get observedAttributes() {
      return DCCVisual.observedAttributes.concat(
         ["image", "character", "role", "description"]);
   }

   get image() {
      return this.getAttribute("image");
   }
   
   set image(newValue) {
      this.setAttribute("image", newValue);
   }
   
   get character() {
      return this.getAttribute("character");
   }
   
   set character(newValue) {
      this.setAttribute("character", newValue);
   }
   
   get role() {
      return this.getAttribute("role");
   }
   
   set role(newValue) {
      this.setAttribute("role", newValue);
   }
   
   get description() {
      return this.getAttribute("description");
   }
   
   set description(newValue) {
      this.setAttribute("description", newValue);
   }

   _imageElements() {
      let extension = this.image.lastIndexOf(".");
      let icon = this.image.substring(0, extension) + "-icon" + this.image.substring(extension);
      
      return "<div class='dsty-image-box dsty-border'><img id='char-image' class='dsty-image' src='" + this.image + "'></div>" +
             "<div class='dsty-icon-box dsty-border'><img id='char-icon'class='dsty-icon' src='" + icon + "'></div>";
   }
   
}

(function() {
   DCCReport.editableCode = false;
   customElements.define("dcc-report", DCCReport);
})();
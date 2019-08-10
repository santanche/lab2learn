/* Character DCC Editable
 ************************/
function editableDCCCharacter() {
   DCCCharacter.prototype._imageSelected = function(event) {
      this.image = event.detail;
      this._recordImages.innerHTML = this._imageElements();
      this._editImageListeners();
   };

   DCCCharacter.prototype._editImage = function() {
      this._recordImages.removeEventListener("click", this._editImage);
      this._recordImages.innerHTML = "";
      this._imageSelected = this._imageSelected.bind(this);
      let imageSelector = new DCCResourcePicker();

      // <TODO> provisory
      imageSelector.addSelectList(
            {"doctor": "images/doctor.png",
             "nurse": "images/nurse.png",
             "patient": "images/patient.png"});

      
      this.addEventListener("resource-selected", this._imageSelected);
      imageSelector.addSelectionListener(this);
      
      this._recordImages.appendChild(imageSelector);
   };
   
   DCCCharacter.prototype._editImageListeners = function() {
      let charImage = this._presentation.querySelector("#char-image");
      charImage.addEventListener("click", this._editImage);
      charImage.style.cursor = "pointer";

      let charIcon = this._presentation.querySelector("#char-icon");
      charIcon.addEventListener("click", this._editImage);
      charIcon.style.cursor = "pointer";
   }
   
   DCCCharacter.prototype._activateEditDCC = function() {
      let recordName = this._presentation.querySelector("#record-name");
      recordName.contentEditable = true;
      let recordRole = this._presentation.querySelector("#record-role");
      recordRole.contentEditable = true;
      let recordDescription = this._presentation.querySelector("#record-description");
      recordDescription.contentEditable = true;
      
      this._editImage = this._editImage.bind(this);
      this._editImageListeners();
   };

}
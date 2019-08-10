/* Image DCC Editable
 ********************/
/*
function editableDCCMarkdown() {
   DCCMarkdown.prototype._activateEditDCC = function() {
      this._presentation.contentEditable = true;
      this._textChanged = this._textChanged.bind(this);
      this._presentation.addEventListener("blur", this._textChanged);
   };

   DCCMarkdown.prototype._textChanged = function() {
      const md = Translator.instance.htmlToMarkdown(this._presentation.innerHTML);
      let textObj = {
         type: "text",
         elementid: this.id,
         content: md,
         markdown: md
      };
      MessageBus.ext.publish("control/knot/update", textObj);
   };
}
*/
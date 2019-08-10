/* Lively Talk DCC Editable
 **************************/
function editableDCCLivelyTalk() {
   DCCLivelyTalk.prototype._activateEditDCC = function() {
      let talkCharacter = this._presentation.querySelector("#dcc-talk-character");
      talkCharacter.contentEditable = true;
      let talkText = this._presentation.querySelector("#dcc-talk-text");
      talkText.contentEditable = true;
   };
}
/**
 * Functions to activate and deactivate DCC editor
 */
function editAllDCCs() {
   let dccs = document.querySelectorAll("*");
   for (d = 0; d < dccs.length; d++)
      if (dccs[d].tagName.toLowerCase().startsWith("dcc-"))
         dccs[d].activateEditDCC();
}
/**
 * DCC which is the basis of all components
 */

class DCCBase extends HTMLElement {
   static get observedAttributes() {
      return ["id", "author"];
   }

   get id() {
      return this.getAttribute("id");
   }
   
   set id(newValue) {
      this.setAttribute("id", newValue);
   }
   
   get author() {
      return this.hasAttribute("author");
   }

   set author(isAuthor) {
      if (isAuthor) {
         this.setAttribute("author", '');
      } else {
         this.removeAttribute("author");
      }
   }
}
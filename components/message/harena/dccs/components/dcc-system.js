/**
 * DCC which is the basis of all components
 */

class DCCSystem {
   static getImageFiles() {
      return DCCSystem.imageFiles;
   }
}

(function() {
   DCCSystem.imageFiles = [
      "images/nurse.png",
      "images/doctor.png",
      "images/patient.png"
   ];
})();
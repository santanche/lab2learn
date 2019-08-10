/**
 * Bus
 */

class MessageBus {
   constructor(externalized) {
      this._externalized = externalized;
      this._listeners = [];
   }

   get externalized() {
      return this._externalized;
   }
   
   set externalized(newValue) {
      this._externalized = newValue;
   }
   
   // <TODO> provisory
   defineRunningCase(runningCase) {
      this._runningCase = runningCase;
   }
   
   subscribe(topic, callback) {
      let status = true;
      
      // Topic Filter: transform wildcards in regular expressions
      if (topic.indexOf("+") > -1 || topic.indexOf("#") > -1) {
         const reTopic = MessageBus._convertRegExp(topic);
         this._listeners.push({topic: topic,
                               regexp: reTopic,
                               callback: callback});
         
      } else 
         this._listeners.push({topic: topic,
                               callback: callback});
      
      return status;
   }
   
   unsubscribe(topic, callback) {
      let found = false;
      for (let l = 0; l < this._listeners.length && !found; l++)
         if (this._listeners[l].topic == topic &&
             this._listeners[l].callback == callback) {
            this._listeners.splice(l, 1);
            found = true;
         }
   }
   
   async publish(topic, message) {
      // console.log(topic);
      // console.log(message);
      for (let l in this._listeners)
         if (this.matchTopic(l, topic))
            this._listeners[l].callback(topic, message);
      
      if (this._externalized) {
         if (DCCCommonServer.loggerAddressAPI) {
            let extMessage = (message != null) ? message : {};
            if (typeof message != "object")
               extMessage = {content: message};
            let extTopic = topic;
            if (this._runningCase != null) {
               extMessage.track = {userid:  this._runningCase.track.userid,
                                   caseid:  this._runningCase.track.caseid};
               extTopic = this._runningCase.runningId + "/" + topic;
            }
            
            const response = await fetch(DCCCommonServer.loggerAddressAPI + "message", {
               method: "POST",
               body: JSON.stringify({"topic": extTopic,
                                     "payload": extMessage
                                    }),
               headers:{
                 "Content-Type": "application/json"
               }
             });
             const status = await response.json();
          }

          parent.postMessage({topic: topic, message: message}, "*");

          /*
          if (parent.IPython != null)
             parent.IPython.notebook.kernel.execute(
                'Component.notify("' + topic + '", "' + message + '")');
         */
      }
   }
   
   /* Checks if this topic has a subscriber */
   hasSubscriber(topic) {
      let hasSub = false;
      for (let l = 0; !hasSub && l < this._listeners.length; l++)
         hasSub = this.matchTopic(l, topic);
      return hasSub;
   }
   
   matchTopic(index, topic) {
      let matched = false; 
      if (this._listeners[index].regexp) {
         const matchStr = this._listeners[index].regexp.exec(topic);
         if (matchStr != null && matchStr[0] === topic)
            matched = true;
      } else if (this._listeners[index].topic === topic)
         matched = true;
      return matched;
   }
   
   async request(requestTopic, requestMessage, responseTopic) {
      let rt;
      let rm = (requestMessage) ? requestMessage : null;
      if (responseTopic)
         rt = responseTopic;
      else {
         if (rm == null)
            rm = {};
         else if (typeof rm != "object")
            rm = {body: rm};
         rm.responseStamp = MessageBus._stamp;
         rt = requestTopic + "/response/" + MessageBus._stamp;
         MessageBus._stamp++;
      }

      let promise = new Promise((resolve, reject) => {
         const callback = function(topic, message) {
            resolve({topic: topic, message: message, callback: callback});
         };
         this.subscribe(rt, callback);
         this.publish(requestTopic, rm);
      });
      
      let returnMessage = await promise;
      this.unsubscribe(rt, returnMessage.callback);
      
      return {topic: returnMessage.topic,
              message: returnMessage.message};
   }

   async waitMessage(topic) {
      let promise = new Promise((resolve, reject) => {
         const callback = function(topic, message) {
            resolve({topic: topic, message: message, callback: callback});
         };
         this.subscribe(topic, callback);
      });
      
      let returnMessage = await promise;
      this.unsubscribe(topic, returnMessage.callback);
      
      return {topic: returnMessage.topic,
              message: returnMessage.message};
   }

   /* Message analysis services
      *************************/
   
   static _convertRegExp(filter) {
      return new RegExp(filter.replace("/", "\\/")
                              .replace("+", "[^\/]+")  // "[\\w -\.\*<>]+"
                              .replace("#", ".+"));  // "[\\w\\/ -\.\*<>]+"
   }
   
   static matchFilter(topic, filter) {
      let match = false;
      const regExp = MessageBus._convertRegExp(filter);
      if (regExp.exec(topic) != null)
         match = true;
      return match;
   }
   
   /*
    * Returns the label at a specific level of the message.
    */
   static extractLevel(topic, level) {
      let label = null;
      if (topic != null) {
         const levelSet = topic.split("/");
         if (level <= levelSet.length)
            label = levelSet[level-1];
      }
      return label;
   }

   /* Message building services
      *************************/
   static buildResponseTopic(topic, message) {
      return topic + "/response/" + message.responseStamp;
   }
}

(function() {
   MessageBus._stamp = 1;

   MessageBus.int = new MessageBus(false);
   MessageBus.ext = new MessageBus(true);
})();
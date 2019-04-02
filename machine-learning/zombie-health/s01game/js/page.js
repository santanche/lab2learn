function updateHeader() {
    /*
	var parentWindow = window.parent.document;
	
	parentWindow.getElementById("navigator_text").innerHTML =
        document.getElementById("description").getAttribute("content");
        
    var navigatorPrevious =
        document.getElementById("navigator_previous");
    var navigatorBackward = parentWindow.getElementById("navigator_backward");
    if (navigatorPrevious != null) {
    	navigatorBackward.className = "navigator_backward_enabled";
        navigatorBackward.innerHTML = "<a href='" + navigatorPrevious.getAttribute("content") +
            "' target='render'><div class='navigator_backward_enabled'></div></a>";
    } else {
    	navigatorBackward.className = "navigator_backward_disabled";
    	navigatorBackward.innerHTML = "";
    }
    
    var navigatorNext =
        document.getElementById("navigator_next");
    var navigatorForward = parentWindow.getElementById("navigator_forward");
    if (navigatorNext != null) {
    	navigatorForward.className = "navigator_forward_enabled";
        navigatorForward.innerHTML = "<a href='" + navigatorNext.getAttribute("content") +
            "' target='render'><div class='navigator_forward_enabled'></div></a>";
    } else {
    	navigatorForward.className = "navigator_forward_disabled";
    	navigatorForward.innerHTML = "";
    }
    */
}

function goBack() {
    window.history.back();
}

function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function startGame() {
    var usersStr = localStorage.getItem("zombie-users");
    var users = (usersStr == null) ? {ids: []} : JSON.parse(usersStr);  

    var userid = generateGuid();
    localStorage.setItem("current-user", userid);
    users.ids.push(userid);
    localStorage.setItem("zombie-users", JSON.stringify(users));

    localStorage.setItem("current-case", 1);

    var profile = {
      name : document.querySelector("#name").value,
      route : []
    };
    localStorage.setItem(userid, JSON.stringify(profile));

    localStorage.setItem("zombie-score", 100);
    showScore();

    document.querySelector("#action_ok").innerHTML = "";
    document.querySelector("#action_start").innerHTML = "<a href='Caso_1.html'>Começar</a>";

    traceRoute("Case Start");
}

function increaseScore(title) {
    updateScore(10, title);
}

function decreaseScore(title) {
    updateScore(-10, title);
}

function updateScore(shift, title) {
    var score = parseInt(localStorage.getItem("zombie-score")) + shift;
    localStorage.setItem("zombie-score", score);
    showScore();
    traceRoute(title);
    nextCase();
}

function endScore() {
    traceRoute("End");
    showScore();
}

function showScore() {
    var score = localStorage.getItem("zombie-score");
    var scorePanel = document.getElementById("score");
    scorePanel.innerHTML = score;
}

function nextCase() {
    var currentCase = parseInt(localStorage.getItem("current-case"));
    currentCase++;
    localStorage.setItem("current-case", currentCase);
    document.querySelector("#next_case").innerHTML = "<a href='Caso_" + currentCase + ".html'>Próximo Caso</a>";
}

function traceRoute(node) {
    var currentCase = localStorage.getItem("current-case");
    var score = localStorage.getItem("zombie-score");
    var userid = localStorage.getItem("current-user");
    var profile = JSON.parse(localStorage.getItem(userid));
    var currentTime = new Date();
    profile.route.push(currentCase + "," + node + "," + score + "," + currentTime.getTime());
    localStorage.setItem(userid, JSON.stringify(profile));
}

function reportRoute() {
    var output = "";
    var users = JSON.parse(localStorage.getItem("zombie-users"));
    for (u in users.ids) {
        output += "##userid: " + users.ids[u] + "\n";
        profile = localStorage.getItem(users.ids[u]);
        output += "##profile: " + profile + "\n";
    }
    document.querySelector("#report").innerHTML = output; 
}
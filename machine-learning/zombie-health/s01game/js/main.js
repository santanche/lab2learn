function exportScore() {
    console.log("=== current user ===");
    var userid = localStorage.getItem("current-user");
    console.log("== user id: " + userid);
    var profile = localStorage.getItem(userid);
    console.log("== profile: " + profile);

    console.log("=== all users ===");
    var users = JSON.parse(localStorage.getItem("zombie-users"));
    for (u in users.ids) {
        console.log("== user id: " + users.ids[u]);
        profile = localStorage.getItem(users.ids[u]);
        console.log("== profile: " + profile);
    }
}

function switchStateA()
{
    var sourceItem = document.getElementById("stateA");
    sourceItem.className = "menu_bottom_selected";
    sourceItem.innerHTML = "[State A]";

    var executionItem = document.getElementById("stateB");
    executionItem.className = "";
    executionItem.innerHTML = "<a onclick='switchStateB()' class='link_class'>[State B]</a>";
}

function switchStateB()
{
    var executionItem = document.getElementById("stateA");
    executionItem.className = "";
    executionItem.innerHTML = "<a onclick='switchStateA()' class='link_class'>[State A]</a>";
    
    var sourceItem = document.getElementById("stateB");
    sourceItem.className = "menu_bottom_selected";
    sourceItem.innerHTML = "[State B]";
}

$("button").click(function(){
    $.get("/sign-up",
    {
        firstName: "Dingle",
        lastName: "Burg"
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});
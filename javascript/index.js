alert("hello");
$("#loadPage").click(function(){

    data = {'name':$('#teamName').val()};
    console.log(data);
    $.post("/php/register.php",data,function(response,status){
        alert(status);
    });
    localStorage.setItem("teamName",data.name);
    window.location.href = '/first.html';
});

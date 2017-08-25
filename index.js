$("#loadPage").click(function(){

    data = {'name':$('#teamName').val()};
    console.log(data);
    $.post("./register.php",data,function(response,status){
        console.log(status);
    });

    window.location.href = '/first.html';
});

$('form').submit(function(event){
    event.preventDefault();
    const ps1=$('input[name=password]').val();
    const ps2=$('input[name=newpass]').val();
    if(ps1!=ps2){
        alert('两次输入密码不一致请重新输入');
    }
    const value=$(this).serialize();
    $.post('/register',value,function(res){
        console.log(res);
        if(res.success==0){
            alert(res.message);
            $('input[type!=submit]').val();
        }else{
            location.href='index.html';
        }
    })
})

$('.newpass').on('input',function(){
    const index2=$(this).val();
    const index =$('.password').val();
    console.log(index2,index);
    if(index2!=index){
        $('.span').html('两次密码不一致');
    }else{
        $('.span').html('两次密码一致');
    }
})
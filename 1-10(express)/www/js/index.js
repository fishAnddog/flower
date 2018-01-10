$('form').submit(function (event) {
    event.preventDefault();
    var username = $('input:text').val();
    var password = $('.password').val();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    console.log(username);
    console.log(password);
    const value = $(this).serialize();
    console.log(value);
    $.get('/login?' + value + '', function (res) {
        if (res.success == 0) {
            alert("用户名不存在，前往注册");
            location.href = 'gister.html';
        } else {
            alert(res.message);
            $('input[name=password]').val('');
        }
    })
})






$('input[type=checkbox]').click(function () {
    if(this.checked){
        const name=localStorage.getItem('username');
        const pass=localStorage.getItem('password');
        $('.username').val(name);
        $('.password').val(pass);
    }else{
        console.log('0');
        $('.username').val('');
        $('.password').val('');
    }
})


$.get('/list', function (res) {
    $('.tablelist').html(res);
})


$('.username').on('input', function () {
    const index = $(this).val();
    $.get('/match?value=' + index + '', function (res) {
        $('.red').html(res.message);
    })
})
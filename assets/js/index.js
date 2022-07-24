let username = document.querySelector("#username")
let password = document.querySelector("#password")

$('#registerForm').submit(function(event){
    if(username.value === 'admin' || password.value=== 'admin'){
        alert('Terjadi Kesalahan!');
    } else{
        alert('Berhasil melakukan registrasi!');
    }
    
});

// delete

if(window.location.pathname == "/adminData"){
    $ondelete=$('.table tbody td a.delete');
    $ondelete.click(function(){
        var id = $(this).attr('data-id')

        var request = {
            'url' : `http://localhost:3000/users/${id}`,
            'method' : 'DELETE'
        };

        if(confirm('Are you sure?')){
            $.ajax(request).done(function(response){
                alert('data delete successfully');
                location.reload();
        })
    }
    })
}

// update

$('#updateForm').submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    });

    console.log(data);

    var request = {
        'url' : `http://localhost:3000/users/${data.id}`,
        'method' : 'PUT',
        'data' : data
    };

    $.ajax(request).done(function(response){
        alert('data updated successfully');
    });
    
});
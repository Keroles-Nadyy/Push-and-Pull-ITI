let file_div = document.getElementById('filecontent')
// let load_btn = document.getElementById('load_data')

function load_data(lastModifiedTime) {
    $.ajax({
        url:'http://127.0.0.1:3000/',
        method: 'GET',
        data: {
            message: 'bye',
            lastmod: lastModifiedTime
        },
        success: function (data) {
            response_data = JSON.parse(data);
            file_div.innerHTML = `<h4>${response_data.data}</h4>`
            lastModifiedTime = response_data.filetime;
            load_data(lastModifiedTime);
        },
        error: function () {
            console.log('Error loading data ')
            file_div.innerHTML = '<h2 class="text-danger"> Error getting data</h2> '
            load_data(0);
        },
        complete:function (){
            // console.log("Complete");
            // load_data(0)
        }
    });
}
load_data(0)
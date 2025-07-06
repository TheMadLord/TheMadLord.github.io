function parse_json_data(source_str)
{
    var json = JSON.parse(source_str);
}

function pull_data_using_fetch(call_back)
{
    var id = '1n-rjSYb63Z2jySS3-M0BQ78vu8DTPOjG-SZM4i8IxXI';
    var gid = '0';
    var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
    fetch(url)
    .then(response => response.text())
    .then(data => call_back(parse_json_data(data.slice(47, -2))) 
    );
}

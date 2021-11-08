

function  saveChanges (d) {

    let nx = d.x/width
    let ny = d.y/height
    let sdata = []
    origData.forEach(function(xd){

        if(xd.entity_id == d.entity_id){
            xd.fixed_x = nx
            xd.fixed_y = ny
        }else{
            xd.fixed_x = xd.fixed_x/width
            xd.fixed_y = xd.fixed_y/height
        }
        delete xd.x
        delete xd.y
        sdata.push(xd)
    })

    let jsonObj = Object()
    jsonObj['title']=title_text
    jsonObj['style_option']=style_option
    jsonObj['is_fixed']=is_fixed
    jsonObj['data']=sdata

    let jsonstr = JSON.stringify(jsonObj)
    let xdata = new Blob([jsonstr])
    let a = document.getElementById('exportbutton');
    a.href = URL.createObjectURL(xdata)

    load(sdata)

    var data = (d.entity_id).concat("-").concat(d.x/width).concat("-").concat(d.y/height)

    let url = "http://localhost:8888/d3-erd/erd_api.php?data="+data;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function () {//Call a function when the state changes.

        if (this.readyState === 4 && this.status === 200) {
            var rt = xhttp.responseText;
            console.log(xhttp.responseText)
        }
    }
    return xhttp.send();
}
function getJsonData(d){

            let jsonstr = JSON.stringify(d)
            let xdata = new Blob([jsonstr])
            let a = document.getElementById('exportbutton');
            a.href = URL.createObjectURL(xdata)
            a.download = "TIME_matrix.json"

            if(!is_open){
                let txt = "<ol><li>EXPORT(download) 'TIME_matrix.json' data.</li><li>Open and edit the JSON data</li><li>IMPORT your new JSON file.</li></ol>"
                showTooltip(txt)
                is_open = 1
                setTimeout(function(){
                    addMatrix(d);
                },2000)
            }else{
                addMatrix(d);
            }

}

setTimeout(function(){
    d3.json('data/matrix.json',function(data) {
        getJsonData(data)
    })
     // load data from local file
},100)
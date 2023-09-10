
function parse_log(){
    let log_input = document.getElementById('text_input').value;
    convert_log_to_csv(log_input.replaceAll('\n', '\\\\n')).then(data => {
        let csv_url = data['csvUrl'];
        get_csv(csv_url.replace('http', 'https')).then(response => {
            return response.text();
        }).then(content => {
                        
            
            const blob = new Blob([content], { type: 'text/csv' });

            // Creating an object for downloading url
            const download_url = window.URL.createObjectURL(blob)
        
            // Creating an anchor(a) tag of HTML
            let table = document.getElementById('output');
            table.innerHTML = "";
            for (let row of CSV.parse(content)) {
                let tr = table.insertRow();
                for (let col of row) {
                    let td = tr.insertCell();
                    td.innerHTML = col;
                }
            }  
            document.getElementById('download_btn').innerHTML = `<button><a href="${download_url}" download="download.csv">Download csv</a></button>`;

        })
    })

}


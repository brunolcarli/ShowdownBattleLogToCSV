
const graphql_url = 'https://multiscale.brunolcarli.repl.co/graphql/';


function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

function json(response) {
    return response.json()
};

function get_request_options(payload) {
    return {
        method: 'POST',
        headers: {
            cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
            'Content-Type': 'application/json'
        },
        body: payload
    };
};


function convert_log_to_csv(input_data) {
    let payload = `{"query": "mutation{ parseBattleLog(input: {logText: \\\"${input_data}\\\"}){ battleLog{csvUrl} } }"}`;
    var options = get_request_options(payload);
    return fetch(graphql_url, options)
        .then(json)
        .then(response => {
            return response['data']['parseBattleLog']['battleLog'];
        })
        .catch(err => {
            console.error(err);
        });
};

function get_csv(url) {
    return fetch(url, {'method': 'GET'})
        .then(response => {
            return response
        })
        .catch(err => {
            console.error(err);
        });
};

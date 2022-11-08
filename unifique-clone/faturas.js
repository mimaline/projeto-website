// function getTokenSupabase() {
//     // Alex
//     //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0ZGVpcG9sa2xydWhlcGppZWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMwMDE5MjIsImV4cCI6MTk3ODU3NzkyMn0.YHDU5hRIENIPe-Zbre3A17Qsdby2StDe8xUQ6-0AakE";

//     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3N6cXZ2cndkcWNuanZjb3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNTUxNTUsImV4cCI6MTk3NTgzMTE1NX0.U-3HSFgKo9ydTnKrpQsx5ytrBcLSpGwzVn6LqNwn14E";
// }

function getPaises() {
    data = {};
    callApi("GET", "countries", undefined, function(data) {
        loadDadosPaises(data);
    });
}

function loadDadosPaises(data) {
    const paises = data;

    let bodyTable = document.querySelector(".containerTable-body");
    // reset da tabela
    bodyTable.innerHTML = '';

    let quantidadeIndefinido = 1;
    // percorre os paises e conta quantos tem em cada continente
    paises.forEach(function(oPais, key) {
        let continent = "CONTINENTE VAZIO";
        if (oPais.continent != undefined) {
            id = oPais.id;
            name = oPais.name;
            continent = oPais.continent;

            debugger;

            // colocando pais na tabela de html
            bodyTable.innerHTML += `<tr>
                                            <td>${id}</td>
                                            <td>${name}</td>
                                            <td>${continent}</td>
                                        </tr>`;
        } else {
            quantidadeIndefinido++;
        }

    });
}

// function getUrlBase(port) {
//     // alex - https: //rtdeipolklruhepjiekz.supabase.co/rest/v1/countries?select=*
//     // gelvazio - https://vdcszqvvrwdqcnjvcoxt.supabase.co/rest/v1/countries?select=*";
//     return "https://vdcszqvvrwdqcnjvcoxt.supabase.co/rest/v1/" + port + "select=*";

//     // acesso supabase
//     // The schema migration "revoke superuser access"
//     // will be finalized
//     // for project "BancoDadosSenac"
//     // within a few days.You may opt to finalize the changes now, or it 'll be done so automatically.
// }

function getMyInitFetchApi(method, body) {
    let usaBody = false;
    if (method == "POST") {
        usaBody = true;
    }

    if (usaBody) {
        return {
            method: method,
            //headers: getHeadersSupabase(),
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(body)
        };
    }

    return {
        method: method,
        //headers: getHeaders(),
        headers: getHeadersSupabase(),
        mode: 'cors',
        cache: 'no-cache'
    };
}

function getHeadersSupabase() {
    return new Headers({
        "apikey": getTokenSupabase(),
        "Authorization": "Bearer " + getTokenSupabase(),
    });
}

async function callApi(method, port, body, oCall) {
    if (body == undefined) {
        body = "";
    }

    if (method == undefined) {
        method = "GET";
    }

    if (port == undefined) {
        port = "ping";
    }

    // Define a url
    const url = getUrlBase(port);

    console.log("url gerada:" + url);

    const myInit = getMyInitFetchApi(method, body);

    const promise = await fetch(url, myInit)
        // Converting the response to a JSON object
        .then(response => response.json())
        .then(data => {

            console.log(data);

            if (oCall) {
                // Chama a function por parametro com os dados retornados...
                oCall(data);
            }

        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function atualizaFaturas(status) {
    port = "tbfatura?status=eq." + status + "&";

    data = {};
    callApi("GET", port, undefined, function(data) {
        loadFaturas(data);
    });
}

function loadFaturas(data) {
    const faturas = data;

    debugger;

    let bodyTable = document.querySelector(".containerTable-body");
    // reset da tabela
    bodyTable.innerHTML = '';

    let temDados = false;
    if (parseInt(faturas.length) > 0) {
        temDados = true;
    }

    if (temDados) {
        faturas.forEach(function(oFatura, key) {
            const id = oFatura.id;
            const datapagamento = oFatura.datapagamento;
            const datavencimento = oFatura.datavencimento;
            const valorvencimento = oFatura.valorvencimento;
            const valorpagamento = oFatura.valorpagamento;

            // colocando as faturas na tabela de html
            bodyTable.innerHTML += `<tr>
                                            <td>${id}</td>
                                            <td>${datapagamento}</td>
                                            <td>${datavencimento}</td>
                                            <td>${valorvencimento}</td>
                                            <td>${valorpagamento}</td>
                                        </tr>`;

        });
    }
}
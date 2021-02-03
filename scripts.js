function analyze() {
    const baseUrl = 'http://pewdiepython-backend.azurewebsites.net'

    let username = document.getElementById('instagram-username').value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

            window.location.href = 'result.html';

            localStorage.setItem('colors', xhr.response);
        }
    }

    let maxPosts = 3;
    if (localStorage.getItem('maxPosts')) {
        maxPosts = localStorage.getItem('maxPosts');
    }

    xhr.open('GET', baseUrl + `/api/instagram/analyze?username=${username}&maxPosts=${maxPosts}`);
    xhr.send();
}

function renderResultsTable() {
    let table = document.getElementById('results-table');

    let json = localStorage.getItem('colors');
    let colors = JSON.parse(json);

    for (let row = 0; row < colors.length; row++) {
        let newRow = table.insertRow(-1);

        let rowColor = `#${colors[row].color}`;

        let colorCell = newRow.insertCell(0);
        let visualizationCell = newRow.insertCell(1);
        let imageCell = newRow.insertCell(2);

        let colorNode = document.createElement('b');
        colorNode.innerHTML = rowColor;

        let visualizationNode = document.createElement('b');
        visualizationNode.innerHTML = 'Візуалізація';
        visualizationNode.style.background = rowColor;

        let imageNode = new Image(200, 200);
        imageNode.src = colors[row].url;

        colorCell.appendChild(colorNode);
        visualizationCell.appendChild(visualizationNode);
        imageCell.appendChild(imageNode);
    }
}

async function dumpDb() {
    let db = await fillDb();
    let output = document.getElementById('db-dump');
    output.innerHTML = JSON.stringify(db);
}

dumpDb();

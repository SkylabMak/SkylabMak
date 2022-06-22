function test() {
    const d = new Date();
    date = String(d.getFullYear())
        + String(("0" + (d.getMonth() + 1)).slice(-2))
        + String(("0" + d.getDate()).slice(-2));
    console.log(date);
}
test();
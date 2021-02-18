let moduleName = 'package'
let path = "/package";
path = path.split(moduleName)[1] ? path.split(moduleName)[1] : path

path = `/get` + path;
const p = path.replace(/[\{\}:]/g, '').replace(/\/(.)/g, (str, $1) => {
    return $1.toUpperCase();
});

console.log(`${p}QueryDto`)
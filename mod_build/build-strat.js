let projectName = process.argv[2];
console.log(projectName);
let fs = require('fs');

fs.writeFileSync('./mod_config/project.js', `exports.name = '${projectName}'`);

let exec = require('child_process').execSync;
console.log(exec);
exec('npm run start-run', {stdio: 'inherit'});
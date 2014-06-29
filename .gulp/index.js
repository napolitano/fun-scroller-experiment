var fs              = require('fs');
var onlyScripts     = require('./utility/script_filter');
var tasks           = fs.readdirSync('./.gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});
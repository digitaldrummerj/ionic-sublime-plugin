var request = require('request');
 

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
 
  grunt.registerTask('generate-icons-snippets', function () {
    grunt.log.ok('Loading latest icon names');

    var done = this.async();

    request({
      url: 'https://raw.githubusercontent.com/driftyco/ionicons/v2.0.1/builder/build_data.json',
      headers: {
        'User-Agent': 'Just/ListingDirectory'
      }
    }, function (error, response, body) {
      var json;

      try {
        json = JSON.parse(body);
      } catch (stringError) {
        grunt.log.error(stringError);

        done();
        return;
      }

      if (!error && response.statusCode == 200) {
        grunt.file.delete('icons/');

        var iconReadme = [];
        iconReadme.push('| Icons' + Array(31).join(" ") + '| Snippet Code' + Array(41 - "Snippet Code".length).join(" ") + '|');
        iconReadme.push("|" + Array(37).join("-") + '| :' + Array(39).join("-") + ':|');
        
        json.icons.forEach(function (value) {
          grunt.file.write('icons/name/' + json.prefix + value.name + '.sublime-snippet',
            ['<snippet>',
              '<content><![CDATA["' + json.prefix + value.name + ' icon";$0]]></content>',
              '<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->',
              '<tabTrigger>ionicIcon' + value.name.replace(/-/g, '') + '</tabTrigger>',
              '<!-- Optional: Set a scope to limit where the snippet will trigger -->',
              '<!-- <scope></scope> -->',
            '</snippet>'].join(''));
            
            grunt.file.write('icons/html/' + json.prefix + value.name + '-html.sublime-snippet',
            ['<snippet>',
              '<content><![CDATA[<i class="' + json.prefix + value.name + ' icon"></i>$0]]></content>',
              '<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->',
              '<tabTrigger>ionicIcon' + value.name.replace(/-/g, '') + '</tabTrigger>',
              '<!-- Optional: Set a scope to limit where the snippet will trigger -->',
              '<!-- <scope></scope> -->',
              '</snippet>'].join(''));
            
            //36
            //41
            iconReadme.push('| ' + value.name + Array(36 - value.name.length).join(" ") +'| ionicIcon' + value.name.replace(/-/g,'') + Array(41-('ionicIcon' + value.name.replace(/-/g,'')).length).join(" ") + '|');
        });
        
        grunt.file.write('icons/readme.md', iconReadme.join('\n'));

        grunt.log.oklns(json.icons.length + ' snippets generated :o');
      } else {
        grunt.log.error('Something went wrong, GitHub API message: ' + json.message + ' statusCode: ' + response.statusCode);
      }

      done();
    });
  });

  grunt.registerTask('build', ['generate-icons-snippets']);
};

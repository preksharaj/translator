var fs = require('fs');
var path = require('path');
var googleTranslate = require('google-translate')('AIzaSyAuTf1csdpQoR_iS_srkGApLQidSisVZB0');
//var prompt = require('prompt');
//var S = require('string');
var readline=require('readline');
var rl=readline.createInterface(process.stdin, process.stdout);
var csvWriter = require('csv-write-stream');
var writer = csvWriter({ headers: ["file", "english","spanish"]});
writer.pipe(fs.createWriteStream('out.csv'));
fs.mkdir("liby",function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log('created');
            }
       });
rl.question("what is desired language", function(answer){
    console.log(answer);

//   
var files = fs.readdirSync('./spain');

files.forEach(function(fileName, i) {

    var file = path.join(__dirname, "spain", fileName);

    fs.readFile(file, 'utf-8', function(error, content) {

        googleTranslate.translate(content, answer , function(error, translation) {
            if(!error) {
              var translated = translation.translatedText;
                var subject=content;
              console.log(fileName,"\t\t", translated);
              // this is where we should handle writing the file
                
writer.write([fileName, subject, translated]);
                    //writer.write('\n');
//writer.end();
               
 
                fs.writeFile('liby/'+fileName+'.txt', translated, function(err){
            if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
        } );

            } else {
              console.log(error);
            }
        });

    rl.close();});
});

});

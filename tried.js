var fs = require('fs');
var path= require('path');
var googleTranslate = require('google-translate')('AIzaSyAuTf1csdpQoR_iS_srkGApLQidSisVZB0');
var request = require('request');
var deasync = require("deasync");
var csvWriter = require('csv-write-stream');
var writer = csvWriter({ headers: ["file", "english","spanish"]});
writer.pipe(fs.createWriteStream('out.csv'));
fs.mkdir("libe",function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log('created');
            }
       });
//var content ={};
 var files= fs.readdirSync('./spain');
    files.forEach(function(fileName) {
        var file= path.join(__dirname,"spain", fileName);
        console.log(file);
      var content= fs.readFileSync(file, 'utf-8');
        console.log(fileName);
       // console.log(content);
        console.log('next');
       
    //here I have to make API call 
    //then translate that content get result back stoe it in a variable
    //console.log that variable or write back to a folder of files
       // console.log('content:', content);
        
   //googleTranslate.translate(content, 'es', function(err, translation) {
  //console.log(translation.translatedText+'\n\n');
       // fs.appendFile("test.txt",translation.translatedText+'\n\n');
        var getHtml = deasync(function (url, cb) {
   var userAgent = {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"}
    request.post({
    url: "https://www.googleapis.com/language/translate/v2",
    async: false,
    headers: {"X-HTTP-Method-Override": "GET"},
    form: {
      key: 'AIzaSyAuTf1csdpQoR_iS_srkGApLQidSisVZB0' ,
      target: "es",
      q: content
    }
  }, function(error, response, data) {
    if (!error && response.statusCode == 200) {
      console.log("everything works fine");
        //console.log(data);
        var json=JSON.parse(data);
        var data2 = json.data.translations[0].translatedText;
        console.log(data2);
       console.log('written');
        writer.write([fileName, content, translated]);
//writer.end();
        fs.writeFile('libe/'+fileName+'.txt', data2, function(err){
            if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
        } );
        
       // next()
       
    } else {
        cb(err, null);
      console.log("something went wrong")
    }
        cb(null, data);

  });

        
    });
        var myTitle = getHtml("https://www.googleapis.com/language/translate/v2");
        //console.log(myTitle);
    });
    
  


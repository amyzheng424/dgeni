var docProcessorFactory = require('../lib/doc-processor');
var tagParser = jasmine.createSpyObj('tagParser', ['parse', 'getTags']);
var tagDefs = [];

describe("doc-processor", function() {

  it("should call each of the plugins in turn, passing the docs object to each", function() {
    var log = [], docs = [ { content: 'a'}, { content: 'b'}];
    before = { before: function(docs) { log.push('before'); return docs; } };
    each = { each: function(doc) { log.push('each:' + doc.content); } };
    after = { after: function(docs) { log.push('after'); return docs; } };


    var config = {
      processing: {
        plugins: [before, each, after]
      }
    };

    var process = docProcessorFactory(config.processing.plugins, config);
    var processedDocs = process(docs);
    expect(log).toEqual(['before', 'each:a', 'each:b', 'after']);
    expect(processedDocs).toEqual(docs);
  });

});
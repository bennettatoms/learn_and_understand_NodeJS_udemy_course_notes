module.exports = function(app) {
   
  app.get('/api', function(req, res) {
    // Node's res object has a .json() method that can serialize JSON objects
    // and add the appropriate content-type (application/json) to the response header
    res.json({ firstname: 'John', lastname: 'Doe' });
  });

    
  app.get('api/person/:id', function(req, res) {
    // get this person with id === req.params.id
    res.json({ firstname: 'John', lastname: 'Doe' });
  });

  app.post('api/person', urlencodedParser, function(req, res) {
    // save the person in the req body to the database
  });

  app.delete('api/person/:id', jsonParser, function(req, res) {
    // get this person with id === req.params.id
  });
};

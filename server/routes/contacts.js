var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
const message = require('../models/message');

var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
  // call the Document model find() method to get all documents in the collection
  const contacts = Contact.find().populate('group')
    .then(contacts => {
      res.status(200).json(contacts)
    }
    )
    .catch(err => {
      res.status(500).json(err);
    });
  // if an error occurred
  //    return response status 500 and a JSON object containing information about the error
  // endIf
  // return response status 200 and a JSON object containing the list of documents
});

router.get('/:id', (req, res, next) => {
  Contact.findOne({id: req.params.id})
    .then(contact => {
      res.status(201).json(
        {
          message: "Successfully found the Contact",
          contact : contact
        }
      )
  })
  .catch(err => {
    res.status(404).json({
      message: err
    })
  })
})


router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxDocumentId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { document: 'Document not found'}
      });
    });
});
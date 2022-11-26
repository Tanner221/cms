var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
  // call the Document model find() method to get all documents in the collection
  const contacts = Message.find()
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


router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  console.log(message);

  message.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Message added successfully',
        document: createdDocument
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
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
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
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
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
        message: 'Message not found.',
        error: { document: 'Document not found'}
      });
    });
});
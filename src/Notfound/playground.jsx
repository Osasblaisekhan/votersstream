// Use the VoteData database
use('VoteData');

// Create a collection named 'Contestants' with schema validation
db.createCollection('Contestants', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "votes", "party", "state", "district", "bio", "photoUrl"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        age: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        votes: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        party: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        state: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        district: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        bio: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        photoUrl: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  },
  validationLevel: "strict"
});

// Insert a document into the Contestants collection
db.Contestants.insertOne({
  name: "John Doe",
  age: 45,
  votes: 1500,
  party: "Independent",
  state: "California",
  district: "12",
  bio: "A dedicated public servant with a passion for community.",
  photoUrl: "http://example.com/photo.jpg"
});

// Insert multiple documents
db.Contestants.insertMany([
  {
    name: "Jane Smith",
    age: 38,
    votes: 2000,
    party: "Democratic",
    state: "New York",
    district: "15",
    bio: "Advocate for education reform.",
    photoUrl: "http://example.com/photo2.jpg"
  },
  {
    name: "Emily Johnson",
    age: 29,
    votes: 1200,
    party: "Republican",
    state: "Texas",
    district: "5",
    bio: "Young and dynamic leader.",
    photoUrl: "http://example.com/photo3.jpg"
  }
]);




// Explanation:
// Schema Definition: The Contestants collection is created with a schema that requires all 8 fields.
// Inserting Data:
// insertOne() is used to insert a single document.
// insertMany() is used to insert multiple documents at once.







//create a database and a collection

const database = 'VoteData';
const collection = 'Contestants';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);


// Create a new contestant
app.post('/contestants', async (req, res) => {
  const newContestant = new Contestant(req.body);
  try {
    const savedContestant = await newContestant.save();
    res.status(201).json(savedContestant);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a contestant
app.put('/contestants/:id', async (req, res) => {
  try {
    const updatedContestant = await Contestant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContestant);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a contestant
app.delete('/contestants/:id', async (req, res) => {
  try {
    await Contestant.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});
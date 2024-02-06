This can be seen as a guide to backend, everyhing taught in Harkirat Singh's 100xDevs Cohort summed up here

Step 1:- Creating Mongoose Schemas
Syntax for creating:- new mongoose.Schema()
Syntax for modelling:- mongoose.model()

Step 2:- Writing Zod Schemas
Syntax for creating:- z.object({
variable: z.string().conditions() - check documentation
})

Step 3:- Write Express routes
remember to import zod and mongoose schemas as { schemas } as they are objects
Post syntax :- app.post('/', async function(req,res){
logic here
})
req is the request object and res is the result object.

List of Mongoose queries:- These ones should be absolutely enough to do everything possible
Model.create()
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()

Whenever you expect a datapoint to fail, invalid inputs, user already exists always return, example:-
if (existingUser) {
return res.status(411).json({
message: 'User already exists'
})
}

Always remember to await on a mongoose query

//Syntax for get routes:-
app.get('/', async function(req,res){
logic here
})
Use find or findOne based on requirements

Syntax for put routes:-
app.put('/', async function(req,res){
logic here
})

await User.updateOne({ filter }, {filed to update});

STEP 4(Simplified) JWT :-

So in JWT only remember 2 things,
Sign and verify.

When you take an object and pass your secret key along with it, that means signing ie generating token
Now you can sign either by passing the whole object, or just one of the fields or newly generated userId

Be careful for this:- throws an error
const newUser = await User.create({
object
})
jwt.sign(newUser, SECRET)

Instead:-
const newUser = ({
object
})
await User.create({
newUser
})
jwt.sign(mewUser, SECRET);
Always pass the variable not a mongoose query

JWT Verify:-

pass the token along with the SECRET to get the object back

const obj = jwt.verify(token, SECRET)

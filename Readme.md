# MongoDb Queries
- User.find returns all user
- User.findOne return first matching user
- User.findById return user by id
- User.find().select('name email -_id') return user list with name & email
- User.find().limit(5).skip(1) return limted 5 user by skipping 1st
- User.find().sort({age : -1}) sort users by age in desc order
- User.countDocuments({isActive : true})
- User.findByIdAndDelete(newUser._id)
- User.findByIdAndUpdate(newUser._id, {
    $set : {
        age: 100
    },
    {new: true}
})
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB... "))
  .catch((err) => console.error("Could not connect to MongoDB... ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Mongoose Class Modeling
const Course = mongoose.model("course", courseSchema);

// Create Course Function
async function createCourse() {
  const course = new Course({
    name: "Test Course",
    author: "Ryan Yuri",
    tags: ["test"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// Get Courses Function
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  // COMPARISON OPERATORS //
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // LOGICAL OPERATORS
  // or
  // and

  const courses = await Course.find({ author: "Ryan Yuri", isPublished: true })
    // Starts with 'Ryan' //
    //  .find({ author: /^Ryan/ })
    //
    // Ends with 'Yuri' //
    // .find({ author: /Yuri$/i })
    //
    // Contains 'Ryan' //
    // .find({ author: /.*Ryan.*/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    //.select({ name: 1, tags: 1 });
    .count();
  console.log(courses);
}

// Update Course
async function updateCourse(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  // OR
  // Approach: Update first
  // Update directly
  // Optionally: get the update document
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Bob Mills",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(course);
}

// Delete/Remove Course
async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id }); // Can use deleteMany()
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// call desired function
removeCourse("612ed99c243e2402dc8de49f");

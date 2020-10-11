const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Course = require('../models/Course');

// @route     GET api/courses
// @desc      Get all users courses
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find({user: req.user.id}).sort({
      date: -1,
    });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/courses
// @desc      Add new course
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, phone} = req.body;

    try {
      const newCourse = new Course({
        name,
        email,
        phone,
        user: req.user.id,
      });

      const course = await newCourse.save();

      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/courses/:id
// @desc      Update course
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, email, phone} = req.body;

  // Build course object
  const courseFields = {};
  if (name) courseFields.name = name;
  if (email) courseFields.email = email;
  if (phone) courseFields.phone = phone;

  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({msg: 'Course not found'});

    // Make sure user owns course
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      {$set: courseFields},
      {new: true},
    );

    res.json(course);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/courses/:id
// @desc      Delete course
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({msg: 'Course not found'});

    // Make sure user owns course
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Course.findByIdAndRemove(req.params.id);

    res.json({msg: 'Course removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

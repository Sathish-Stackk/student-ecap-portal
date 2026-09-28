import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  photo: String,
  role: {
    type: String,
    default: 'student',
    enum: ['student']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
studentSchema.methods.comparePassword = async function(inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
};

export default mongoose.model('Student', studentSchema);

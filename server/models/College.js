import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    city: String,
    state: String,
    country: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contactInfo: {
    email: String,
    phone: String,
    website: String
  },
  logo: String,
  banner: String,
  description: String,
  established: Number,
  principal: String,
  departments: [{
    name: String,
    hod: String,
    description: String
  }],
  facilities: [String],
  accreditation: {
    agency: String,
    grade: String,
    year: Number
  },
  studentCount: Number,
  staffCount: Number,
  campusSize: String,
  libraryInfo: {
    booksCount: Number,
    databasesAvailable: [String]
  },
  placements: {
    averagePackage: String,
    highestPackage: String,
    placementRate: Number,
    topRecruiters: [String]
  },
  sports: [String],
  clubs: [String],
  hostel: {
    available: Boolean,
    capacity: Number,
    feePerSemester: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('College', collegeSchema);

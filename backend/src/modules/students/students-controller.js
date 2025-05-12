const asyncHandler = require("express-async-handler");
const { ApiError } = require("../../utils");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;
  const students = await getAllStudents({ name, className, section, roll });
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = {
    name: req.body.name?.trim(),
    email: req.body.email,
    gender: req.body.gender?.trim(),
    phone: req.body.phone?.trim(),
    dob: req.body.dob,
    currentAddress: req.body.currentAddress?.trim(),
    permanentAddress: req.body.permanentAddress?.trim(),
    fatherName: req.body.fatherName?.trim(),
    fatherPhone: req.body.fatherPhone?.trim(),
    motherName: req.body.motherName?.trim(),
    motherPhone: req.body.motherPhone?.trim(),
    guardianName: req.body.guardianName?.trim(),
    guardianPhone: req.body.guardianPhone?.trim(),
    relationOfGuardian: req.body.relationOfGuardian?.trim(),
    systemAccess: req.body.systemAccess ?? true,
    class: req.body.class?.trim(),
    section: req.body.section?.trim(),
    admissionDate: req.body.admissionDate,
    roll: req.body.roll ? parseInt(req.body.roll) : null,
  };

  const message = await addNewStudent(payload);
  res.status(201).json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentId = parseInt(id);

  if (isNaN(studentId)) {
    throw new ApiError(400, "Invalid student ID");
  }

  const payload = {
    userId: studentId,
    name: req.body.name?.trim(),
    email: req.body.email,
    gender: req.body.gender?.trim(),
    phone: req.body.phone?.trim(),
    dob: req.body.dob,
    currentAddress: req.body.currentAddress?.trim(),
    permanentAddress: req.body.permanentAddress?.trim(),
    fatherName: req.body.fatherName?.trim(),
    fatherPhone: req.body.fatherPhone?.trim(),
    motherName: req.body.motherName?.trim(),
    motherPhone: req.body.motherPhone?.trim(),
    guardianName: req.body.guardianName?.trim(),
    guardianPhone: req.body.guardianPhone?.trim(),
    relationOfGuardian: req.body.relationOfGuardian?.trim(),
    systemAccess: req.body.systemAccess,
    class: req.body.class?.trim(),
    section: req.body.section?.trim(),
    admissionDate: req.body.admissionDate,
    roll: req.body.roll ? parseInt(req.body.roll) : null,
  };

  const message = await updateStudent(payload);
  res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const studentId = parseInt(id);

  if (isNaN(studentId)) {
    throw new ApiError(400, "Invalid student ID");
  }

  const student = await getStudentDetail(studentId);
  res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const studentId = parseInt(id);

  if (isNaN(studentId)) {
    throw new ApiError(400, "Invalid student ID");
  }

  if (typeof status !== "boolean") {
    throw new ApiError(400, "Status must be a boolean value");
  }

  if (!req.user?.id) {
    throw new ApiError(401, "Unauthorized - User not authenticated");
  }

  const message = await setStudentStatus({
    userId: studentId,
    reviewerId: req.user.id,
    status,
  });
  res.json(message);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};

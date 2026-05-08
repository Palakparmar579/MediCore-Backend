import AssignDept from "../../models/AssignDept.js";

export const getNurseDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const assignment = await AssignDept.findOne({ nurses: userId })
      .populate("doctors", "name email phone experience profileImage")
      .populate("nurses", "name email profileImage phone")
      .populate("department");

    if (!assignment) {
      return res.json({
        doctor: null,
        department: null,
        otherDoctors: [],
        nurses: [],
      });
    }

    const loggedNurse = assignment.nurses.find(
      (nur) => nur._id.toString() === userId
    );

    const otherDoctors = assignment.doctors.filter(
      (doc) => doc._id.toString() !== userId
    );

    res.json({
      nurse: loggedNurse,
      department: assignment.department,
      deptNum: assignment.deptNum,
      otherDoctors,
      nurses: assignment.nurses,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



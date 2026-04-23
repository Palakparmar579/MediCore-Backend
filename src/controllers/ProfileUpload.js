import User from "../models/user.js";

export const profileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = req.file.path;
    const userId = req.user?.id 

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }

    ).select("-password");
    await User.findByIdAndUpdate(userId, { profileImage: imageUrl });
    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: imageUrl,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
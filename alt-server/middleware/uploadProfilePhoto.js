import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/profile-photos",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.user.userId}${ext}`);
  },
});

export const uploadProfilePhoto = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"));
    }
    cb(null, true);
  },
});

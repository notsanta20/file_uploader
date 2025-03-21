const express = require(`express`);
const router = express.Router();
const index = require(`../controllers/index`);
const signup = require(`../controllers/signup`);
const signupPost = require(`../controllers/signupPost`);
const login = require(`../controllers/login`);
const passport = require(`passport`);
const logout = require(`../controllers/logout`);
const vault = require(`../controllers/vault`);
const vaultFolder = require(`../controllers/vaultFolder`);
const uploadFile = require(`../controllers/uploadFile`);
const uploads = require(`../configs/multerUploads`);
const newFolder = require(`../controllers/newFolder`);
const deleteFolder = require(`../controllers/deleteFolder`);
const deleteFile = require(`../controllers/deleteFile`);
const downloadFile = require(`../controllers/downloadFile`);
const createLink = require(`../controllers/createLink`);
const shareFile = require(`../controllers/shareFile`);

router.get(`/`, index);
router.get(`/signup`, signup);
router.post(`/signup`, signupPost);
router.get(`/login`, login);
router.post(
  `/login`,
  passport.authenticate(`local`, {
    successRedirect: `/vault`,
    failureRedirect: `/login`,
    failureMessage: true,
  })
);
router.get(`/logout`, logout);
router.get(`/vault`, vault);
router.get(`/vault/:folderName`, vaultFolder);
router.post(`/vault`, uploads.single(`file`), uploadFile);
router.post(`/vault/:folderName`, uploads.single(`file`), uploadFile);
router.post(`/addFolder`, newFolder);
router.get(`/deleteFolder`, deleteFolder);
router.get(`/deleteFile`, deleteFile);
router.get(`/download`, downloadFile);
router.get(`/createLink/:id&:duration`, createLink);
router.get(`/share/:id`, shareFile);
module.exports = router;

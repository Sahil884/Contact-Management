import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../contollers/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);
router.route("/get").get(getContacts);
router.route("/:id").put(updateContact).delete(deleteContact);

export default router;

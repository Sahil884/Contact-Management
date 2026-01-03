import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { Contact } from "../models/contacts.model.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // validation
  if ([name, email, phone].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "required fields are missing");
  }

  // checking if contact already exists : email, phone

  const existedContact = await Contact.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedContact) {
    throw new ApiError(
      409,
      "Contact with email or phone number already exists"
    );
  }

  // create new contact
  const contact = await Contact.create({ name, email, phone, message });

  // check if contact is created or not

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, contact, "Contact Created Successfully"));
});

const getContacts = asyncHandler(async (req, res) => {
  const allContacts = await Contact.find();

  return res
    .status(201)
    .json(new ApiResponse(200, allContacts, "Contacts fetched successfully"));
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  await contact.deleteOne();

  res.status(200).json(new ApiResponse(200, "Contact deleted"));
});

const updateContact = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (data.completed !== undefined) {
    data.completed = data.completed === "Yes" || data.completed === true;
  }

  const updated = await Contact.findOneAndUpdate({ _id: req.params.id }, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new ApiError(404, "Contact not found or can't be updated");
  }

  res
    .status(201)
    .json(new ApiResponse(200, updated, "Contact updated successfully"));
});

export { createContact, getContacts, updateContact, deleteContact };

// npm i react-hook-form zod @hookform/resolvers
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const supplierSchema = z.object({
  // firstName: z
  //   .string()
  //   .trim()
  //   .min(3, "First name must be at least 3 characters"),

  // lastName: z.string().trim().min(3, "Last name must be at least 3 characters"),

  supplierName: z
    .string()
    .trim()
    .min(3, "Supplier name must be at least 3 characters"),

  companyName: z
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters"),

  // age: z.coerce
  //   .number()
  //   .min(18, "Minimum age should be 18")
  //   .max(90, "Maximum age should be 90"),

  // phoneNumber: z
  //   .string()
  //   .regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits"),

  // role: z.string().min(1, "Please select a role"),

  address: z.string().trim().min(5, "Address is required"),

  gstNumber: z.string().trim().min(5, "GST Number is required"),

  city: z.string().trim().min(3, "City is required"),

  state: z.string().trim().min(3, "State is required"),

  pinCode: z.string().trim().min(6, "Pin Code is required"),

  email: z.email("Invalid email address"),
  // email: z.email({
  //   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //   error: "Invalid email address",
  // }),

  // password: z
  //   .string()
  //   .min(6, "Password must be at least 6 characters")
  //   .max(20, "Password should not exceed 20 characters"),

  creationDate: z.any().refine((val) => val, {
    message: "Please select date",
  }),
});

export default supplierSchema;

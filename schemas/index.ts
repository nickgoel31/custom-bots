import { botCategories } from "@/types";
import { z } from "zod";

export const gendersArray = [
  "male",
  "female",
  "other",
  "non-binary",
  "agender",
  "genderqueer",
  "bigender",
  "two-spirit",
  "genderfluid",
  "demiboy",
  "demigirl",
  // Add more genders here
];

export const botSchema = z.object({
    imageUrl: z.string().url(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string().refine(val => gendersArray.includes(val), {
    message: "Unknown Gender passed"
  }),
  introduction: z.string().min(2, {
    message: "Introduction must be at least 2 characters.",
  }).max(500, {message: "Introduction must be at most 200 characters."}),
  description: z.string().min(40, {
    message: "Description must be at least 40 characters.",
  }).max(1000, {message: "Description must be at most 500 characters."}),
  introMessage: z.string().max(500, {message: "IntroMessage must be at most 500 characters."}).optional(),

    // Add more fields here if needed.
    personality: z.string().max(500, {message: "Personality must be at most 200 characters."}).optional(),
    speakingStyle: z.string().max(500, {message: "Speaking Style must be at most 200 characters."}).optional(),
    physicalFeatures: z.string().max(500, {message: "Physical Features must be at most 200 characters."}).optional(),

  isPublic: z.boolean(),
  isVerified: z.boolean().optional(),
  isDraft: z.boolean(),
  isRoleplay: z.boolean().optional(),

  category: z.string().refine(val => botCategories.includes(val),{
    message: "Unknown category passed"
  })
  
})
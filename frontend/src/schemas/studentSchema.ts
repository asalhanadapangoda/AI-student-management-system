import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

export const contactInfoSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
});

export const degreeInfoSchema = z.object({
  degreeProgramId: z.coerce.number().min(1, 'Please select a degree program'),
});

export const enrollmentSchema = z.object({
  // Array of course IDs they want to enroll in for the first semester
  courseIds: z.array(z.number()).optional(),
});

// Full schema is useful if we want to validate the entire combined object before final submission
export const fullStudentRegistrationSchema = personalInfoSchema
  .merge(contactInfoSchema)
  .merge(degreeInfoSchema)
  .merge(enrollmentSchema);

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type DegreeInfoData = z.infer<typeof degreeInfoSchema>;
export type EnrollmentData = z.infer<typeof enrollmentSchema>;
export type FullRegistrationData = z.infer<typeof fullStudentRegistrationSchema>;

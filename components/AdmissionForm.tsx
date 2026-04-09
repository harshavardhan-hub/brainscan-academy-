"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdmissionFormProps {
  formId: string;
  title: string;
  description?: React.ReactNode;
  courses: string[];
}

export default function AdmissionForm({ formId, title, description, courses }: AdmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    age: "",
    gender: "",
    schoolName: "",
    classGrade: "",
    parentName: "",
    occupation: "",
    mobileNumber: "",
    altNumber: "",
    email: "",
    fullAddress: "",
    selectedCourses: [] as string[],
    mode: "",
    timing: "",
    hasPreviousLearning: "No",
    previousLearningDetails: "",
    declaration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "declaration") {
        setFormData((prev) => ({ ...prev, declaration: checked }));
      } else if (name === "selectedCourses") {
        setFormData((prev) => ({
          ...prev,
          selectedCourses: checked
            ? [...prev.selectedCourses, value]
            : prev.selectedCourses.filter((c) => c !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsSuccess(false);

    try {
      const apiUrl = "/api/admission";
      
      const payload = {
        content: `📥 New Admission Form Submission - ${formId}`,
        embeds: [
          {
            title: title || "New Admission",
            color: 5814783,
            fields: [
              { name: "Admission Type", value: formId, inline: true },
              { name: "Student Name", value: formData.studentName || "N/A", inline: true },
              { name: "Age & DOB", value: `${formData.age} yrs (${formData.dob})`, inline: true },
              { name: "Gender", value: formData.gender || "N/A", inline: true },
              { name: "School & Class", value: `${formData.schoolName || "N/A"} - ${formData.classGrade}`, inline: true },
              { name: "Parent Name & Occ.", value: `${formData.parentName} (${formData.occupation || "N/A"})`, inline: true },
              { name: "Parent Phone", value: formData.mobileNumber, inline: true },
              { name: "Email", value: formData.email || "N/A", inline: true },
              { name: "Address", value: formData.fullAddress },
              { name: "Selected Courses", value: formData.selectedCourses.length > 0 ? formData.selectedCourses.join(", ") : "None" },
              { name: "Mode", value: formData.mode || "N/A", inline: true },
              { name: "Timing", value: formData.timing || "N/A", inline: true },
              { name: "Previous Learning", value: formData.hasPreviousLearning === "Yes" ? `Yes: ${formData.previousLearningDetails}` : "No" }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      // Reset form
      setFormData({
        studentName: "",
        dob: "",
        age: "",
        gender: "",
        schoolName: "",
        classGrade: "",
        parentName: "",
        occupation: "",
        mobileNumber: "",
        altNumber: "",
        email: "",
        fullAddress: "",
        selectedCourses: [],
        mode: "",
        timing: "",
        hasPreviousLearning: "No",
        previousLearningDetails: "",
        declaration: false,
      });

    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full rounded-md border border-gray-300/50 bg-white/5 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-200 mb-1";
  const sectionTitleClasses = "text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2";

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-[#0a0a0f]/80 p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-white/10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h1>
        {description && <div className="text-gray-300 md:text-lg">{description}</div>}
      </div>

      {isSuccess && (
        <div className="mb-8 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-center text-lg font-medium">
          🎉 Form submitted successfully! We will contact you soon.
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Details */}
        <div>
          <h2 className={sectionTitleClasses}>Student Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Student Name *</label>
              <input required type="text" name="studentName" value={formData.studentName} onChange={handleChange} className={inputClasses} placeholder="Full Name" />
            </div>
            <div>
              <label className={labelClasses}>Date of Birth *</label>
              <input 
                required 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                className={`cursor-pointer relative overflow-hidden [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${inputClasses}`} 
              />
            </div>
            <div>
              <label className={labelClasses}>Age *</label>
              <input required type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} min="1" placeholder="Ex: 8" />
            </div>
            <div>
              <label className={labelClasses}>Gender *</label>
              <select required name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
                <option value="" disabled className="bg-[#0a0a0f] text-gray-200">Select Gender</option>
                <option value="Male" className="bg-[#0a0a0f] text-gray-200">Male</option>
                <option value="Female" className="bg-[#0a0a0f] text-gray-200">Female</option>
                <option value="Other" className="bg-[#0a0a0f] text-gray-200">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>School Name</label>
              <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className={inputClasses} placeholder="Current School" />
            </div>
            <div>
              <label className={labelClasses}>Class / Grade *</label>
              <input required type="text" name="classGrade" value={formData.classGrade} onChange={handleChange} className={inputClasses} placeholder="Ex: 3rd Grade" />
            </div>
          </div>
        </div>

        {/* Parent Details */}
        <div>
          <h2 className={sectionTitleClasses}>Parent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Parent Name *</label>
              <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className={inputClasses} placeholder="Full Name" />
            </div>
            <div>
              <label className={labelClasses}>Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className={inputClasses} placeholder="Occupation" />
            </div>
            <div>
              <label className={labelClasses}>Mobile Number *</label>
              <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className={inputClasses} placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className={labelClasses}>Alternate Number</label>
              <input type="tel" name="altNumber" value={formData.altNumber} onChange={handleChange} className={inputClasses} placeholder="Optional" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="example@email.com" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h2 className={sectionTitleClasses}>Address</h2>
          <div>
            <label className={labelClasses}>Full Address *</label>
            <textarea required rows={3} name="fullAddress" value={formData.fullAddress} onChange={handleChange} className={inputClasses} placeholder="House No, Street, Landmark, City, Pincode" />
          </div>
        </div>

        {/* Course Details */}
        <div>
          <h2 className={sectionTitleClasses}>Course Details</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Select Courses (Multiple allowed) *</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {courses.map((course) => (
                  <label key={course} className="flex items-center space-x-2 cursor-pointer bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition">
                    <input
                      type="checkbox"
                      name="selectedCourses"
                      value={course}
                      checked={formData.selectedCourses.includes(course)}
                      onChange={handleChange}
                      className="w-4 h-4 rounded bg-gray-900 border-gray-600 text-primary focus:ring-primary focus:ring-offset-gray-900"
                    />
                    <span className="text-gray-200">{course}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Mode of Learning *</label>
                <select required name="mode" value={formData.mode} onChange={handleChange} className={inputClasses}>
                  <option value="" disabled className="bg-[#0a0a0f] text-gray-200">Select Mode</option>
                  <option value="Online" className="bg-[#0a0a0f] text-gray-200">Online</option>
                  <option value="Offline" className="bg-[#0a0a0f] text-gray-200">Offline</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Preferred Timing</label>
                <select name="timing" value={formData.timing} onChange={handleChange} className={inputClasses}>
                  <option value="" disabled className="bg-[#0a0a0f] text-gray-200">Select Timing</option>
                  <option value="Morning" className="bg-[#0a0a0f] text-gray-200">Morning</option>
                  <option value="Evening" className="bg-[#0a0a0f] text-gray-200">Evening</option>
                  <option value="Weekend" className="bg-[#0a0a0f] text-gray-200">Weekend</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Learning */}
        <div>
          <h2 className={sectionTitleClasses}>Previous Learning</h2>
          <div>
            <label className={labelClasses}>Has the child attended similar classes before?</label>
            <div className="flex items-center space-x-6 mt-2 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPreviousLearning"
                  value="Yes"
                  checked={formData.hasPreviousLearning === "Yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-gray-900 border-gray-600 bg-gray-700"
                />
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasPreviousLearning"
                  value="No"
                  checked={formData.hasPreviousLearning === "No"}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-gray-900 border-gray-600 bg-gray-700"
                />
                <span className="text-gray-300">No</span>
              </label>
            </div>
            {formData.hasPreviousLearning === "Yes" && (
              <textarea
                rows={2}
                name="previousLearningDetails"
                value={formData.previousLearningDetails}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Please provide details about previous learning..."
              />
            )}
          </div>
        </div>

        {/* Declaration */}
        <div className="pt-6 border-t border-white/10 mt-8">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="flex items-center h-5">
              <input
                required
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-gray-900 border-gray-600 text-primary focus:ring-primary focus:ring-offset-gray-900 transition mt-0.5"
              />
            </div>
            <span className="text-sm text-gray-300 group-hover:text-gray-200 transition">
              I hereby declare that the information provided above is true to the best of my knowledge. I agree to abide by the rules and regulations of BrainScan Academy.
            </span>
          </label>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting || !formData.declaration || formData.selectedCourses.length === 0}
            className="w-full text-lg py-6 rounded-xl relative overflow-hidden"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </Button>
          {formData.selectedCourses.length === 0 && !isSubmitting && (
            <p className="text-center text-sm text-red-400 mt-2">Please select at least one course.</p>
          )}
        </div>
      </form>
    </div>
  );
}

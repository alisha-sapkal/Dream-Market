import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CompanyDetailsForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    registeredAddress: "",
    officePhone1: "",
    officePhone2: "",
    officialEmail: "",
    companyWebsite: "",
    companyPan: "",
    companyCin: "",
    companyGstin: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = JSON.stringify(formData);

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        credentials: "include",
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Failed to save company details. Please check your input."
        );
      }

      const result = await response.json();

      toast.success(result.message || "Company details saved successfully!");

      setFormData({
        companyName: "",
        registeredAddress: "",
        officePhone1: "",
        officePhone2: "",
        officialEmail: "",
        companyWebsite: "",
        companyPan: "",
        companyCin: "",
        companyGstin: "",
      });

      setTimeout(() => navigate("/submit-property"), 1500);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 font-sans text-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto my-8 w-full">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Builder Company Details
          </h1>
          <p className="text-lg text-gray-600">
            Please provide your company's complete and legally mandated details.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-300"
        >
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="e.g., Prestige Group"
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registeredAddress">
              Registered Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="registeredAddress"
              name="registeredAddress"
              rows="4"
              placeholder="Flat No./Office No., Building Name, Street, Locality, City, State, Pincode"
              required
              value={formData.registeredAddress}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="officePhone1">
                Primary Office Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                id="officePhone1"
                name="officePhone1"
                placeholder="e.g., +91 080 12345678"
                required
                value={formData.officePhone1}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officePhone2">
                Secondary Office Phone (Optional)
              </Label>
              <Input
                type="tel"
                id="officePhone2"
                name="officePhone2"
                placeholder="e.g., +91 080 12345679"
                value={formData.officePhone2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="officialEmail">
              Official Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="officialEmail"
              name="officialEmail"
              placeholder="e.g., info@yourcompany.com"
              required
              value={formData.officialEmail}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Official Website</Label>
            <Input
              type="url"
              id="companyWebsite"
              name="companyWebsite"
              placeholder="e.g., https://www.yourcompany.com"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyPan">
              Company PAN Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="companyPan"
              name="companyPan"
              placeholder="e.g., ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Please enter a valid Company PAN number (e.g., ABCDE1234F)"
              required
              value={formData.companyPan}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyCin">
              Company Registration Number (CIN/LLPIN){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="companyCin"
              name="companyCin"
              placeholder="e.g., U70102DL2007PTC160817"
              required
              value={formData.companyCin}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Corporate Identification Number (CIN) or Limited Liability
              Partnership Identification Number (LLPIN).
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyGstin">
              GSTIN (GST Identification Number)
            </Label>
            <Input
              type="text"
              id="companyGstin"
              name="companyGstin"
              placeholder="e.g., 29AABBCCDD1234Z5"
              pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
              title="Please enter a valid 15-digit GSTIN"
              value={formData.companyGstin}
              onChange={handleChange}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-yellow-700 mb-4">
              By submitting these details, you confirm their accuracy and agree
              to 1metersquares.com's{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 md:w-1/3 text-base font-semibold h-12 mx-auto block"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                </>
              ) : (
                "Save Details & Continue to Property Upload"
              )}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CompanyDetailsForm;

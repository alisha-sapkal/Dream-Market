import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AgentDetailsForm = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    agentReraId: '',
    agencyRegNo: '',
    agencyAddress: '',
    agencyPhone1: '',
    agencyPhone2: '',
    agencyEmail: '',
    agentWebsite: '',
    agentPan: '',
    agencyGstin: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const backendUrl = '/api/save-agent-details';
    const payload = JSON.stringify(formData);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
        credentials: 'include',
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save agency details. Please check your input.');
      }

      const result = await response.json();
      
      toast.success(result.message || "Agency details saved successfully!");

      setFormData({
        agencyName: '',
        agentReraId: '',
        agencyRegNo: '',
        agencyAddress: '',
        agencyPhone1: '',
        agencyPhone2: '',
        agencyEmail: '',
        agentWebsite: '',
        agentPan: '',
        agencyGstin: '',
      });

      setTimeout(() => navigate('/submit-property'), 1500);

    } catch (err) {
      setLoading(false);
      toast.error(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 font-sans text-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto my-8 w-full">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Real Estate Agent Business Details
          </h1>
          <p className="text-lg text-gray-600">
            Please provide your agency's complete and legally mandated business information.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
          <div className="space-y-2">
            <Label htmlFor="agency-name">Agency Name <span className="text-red-500">*</span></Label>
            <Input id="agency-name" name="agencyName" placeholder="e.g., Property Solutions India" required value={formData.agencyName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-rera-id">Agent RERA Registration ID <span className="text-red-500">*</span></Label>
            <Input id="agent-rera-id" name="agentReraId" placeholder="e.g., A/KA/RERA/1251/AG/XXXXXX" required value={formData.agentReraId} onChange={handleChange} />
            <p className="text-xs text-gray-500">Your individual RERA agent registration ID.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-reg-no">Agency Registration Number (if applicable)</Label>
            <Input id="agency-reg-no" name="agencyRegNo" placeholder="e.g., ABC-12345" value={formData.agencyRegNo} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-address">Registered Business Address <span className="text-red-500">*</span></Label>
            <Textarea id="agency-address" name="agencyAddress" rows="4" placeholder="Office No., Building Name, Street, Locality, City, State, Pincode" required value={formData.agencyAddress} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="agency-phone1">Primary Office Phone <span className="text-red-500">*</span></Label>
              <Input type="tel" id="agency-phone1" name="agencyPhone1" placeholder="e.g., +91 9876543210" required value={formData.agencyPhone1} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agency-phone2">Secondary Office Phone (Optional)</Label>
              <Input type="tel" id="agency-phone2" name="agencyPhone2" placeholder="e.g., +91 9876543211" value={formData.agencyPhone2} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-email">Official Email Address <span className="text-red-500">*</span></Label>
            <Input type="email" id="agency-email" name="agencyEmail" placeholder="e.g., contact@youragency.com" required value={formData.agencyEmail} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-website">Official Website</Label>
            <Input type="url" id="agent-website" name="agentWebsite" placeholder="e.g., https://www.youragency.com" value={formData.agentWebsite} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-pan">Agent/Agency PAN Number <span className="text-red-500">*</span></Label>
            <Input type="text" id="agent-pan" name="agentPan" placeholder="e.g., ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" title="Please enter a valid PAN number (e.g., ABCDE1234F)" required value={formData.agentPan} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-gstin">GSTIN (GST Identification Number - if applicable)</Label>
            <Input type="text" id="agency-gstin" name="agencyGstin" placeholder="e.g., 29AABBCCDD1234Z5" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" title="Please enter a valid 15-digit GSTIN" value={formData.agencyGstin} onChange={handleChange} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-yellow-700 mb-4">
              By submitting these details, you confirm their accuracy and agree to 1metersquares.com's <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>
            <Button type="submit" disabled={loading} className="w-full text-lg font-semibold h-12">
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
    </div>
  );
};

export default AgentDetailsForm;

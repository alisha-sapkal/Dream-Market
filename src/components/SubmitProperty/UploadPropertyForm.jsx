import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UploadPropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uploaderType: '',
    individual: {
      pan: '',
      aadhaar: '',
      phone1: '',
      phone2: '',
      email: '',
      address: '',
    },
    property: {
      type: '',
      transactionType: '',
      city: '',
      locality: '',
      projectName: '',
      totalPrice: '',
      bhk: '',
      carpetArea: '',
      projectStatus: '',
      reraId: '',
      possessionDate: '',
      builtUpArea: '',
      plotArea: '',
      bathrooms: '',
      furnishingStatus: '',
      propertyAge: '',
      facing: '',
      description: '',
      longitude: '',
      latitude: '',
    },
    amenities: [],
    landmarks: [{ type: '', name: '' }],
    media: {
      images: null,
      videoLink: '',
      virtualTourLink: '',
    },
    contact: {
      person: '',
      email: '',
      phone: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const amenitiesList = {
    'Community & Lifestyle': [
      { value: 'gated-community', label: 'Gated Community' },
      { value: 'clubhouse', label: 'Clubhouse' },
      { value: 'gym', label: 'Gymnasium' },
      { value: 'swimming-pool', label: 'Swimming Pool' },
      { value: 'children-play-area', label: 'Children\'s Play Area' },
      { value: 'garden', label: 'Landscaped Garden' },
      { value: 'sports-court', label: 'Sports Court (Tennis/Badminton)' },
      { value: 'community-hall', label: 'Community Hall' },
      { value: 'jogging-track', label: 'Jogging Track' },
      { value: 'meditation-area', label: 'Meditation Area' },
      { value: 'senior-citizen-area', label: 'Senior Citizen Area' },
      { value: 'pet-friendly', label: 'Pet-Friendly' },
    ],
    'Safety & Security': [
      { value: '24x7-security', label: '24/7 Security' },
      { value: 'cctv', label: 'CCTV Surveillance' },
      { value: 'intercom', label: 'Intercom Facility' },
      { value: 'fire-safety', label: 'Fire Safety Systems' },
      { value: 'gated-access', label: 'Gated Access' },
    ],
    'Utilities & Convenience': [
      { value: 'power-backup', label: 'Full Power Backup' },
      { value: '24x7-water', label: '24/7 Water Supply' },
      { value: 'lift', label: 'Lift(s)' },
      { value: 'parking', label: 'Covered Parking' },
      { value: 'visitor-parking', label: 'Visitor Parking' },
      { value: 'waste-disposal', label: 'Waste Disposal' },
      { value: 'maintenance-staff', label: 'Maintenance Staff' },
      { value: 'broadband', label: 'Broadband Connectivity' },
      { value: 'piped-gas', label: 'Piped Gas' },
      { value: 'laundry', label: 'Laundry Service' },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'uploaderType') {
      setFormData(prev => ({
        ...prev,
        uploaderType: value,
      }));
      return;
    }

    if (name === 'property_images') {
      setFormData(prev => ({
        ...prev,
        media: {
          ...prev.media,
          images: files,
        },
      }));
      return;
    }

    if (['uploaderType'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    const [category, field] = name.split('_');
    const fieldCamelCase = field
      ? field.replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace('-', '').replace('_', '')
        )
      : '';

    if (['individual', 'property', 'contact'].includes(category)) {
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [fieldCamelCase]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newAmenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter(amenity => amenity !== value);
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleLandmarkChange = (index, e) => {
    const { name, value } = e.target;
    const newLandmarks = formData.landmarks.map((landmark, i) => {
      if (i === index) {
        return { ...landmark, [name]: value };
      }
      return landmark;
    });
    setFormData(prev => ({ ...prev, landmarks: newLandmarks }));
  };

  const addLandmarkField = () => {
    setFormData(prev => ({
      ...prev,
      landmarks: [...prev.landmarks, { type: '', name: '' }],
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const backendUrl = '/api/upload-property';
    
    const data = new FormData();
    data.append('uploaderType', formData.uploaderType);
    data.append('individualDetails', JSON.stringify(formData.individual));
    data.append('propertyDetails', JSON.stringify(formData.property));
    data.append('amenities', JSON.stringify(formData.amenities));
    data.append('landmarks', JSON.stringify(formData.landmarks));
    data.append('contactDetails', JSON.stringify(formData.contact));

    if (formData.media.images) {
      for (let i = 0; i < formData.media.images.length; i++) {
        data.append('property_images', formData.media.images[i]);
      }
    }
    
    if (formData.media.videoLink) {
        data.append('video_tour_link', formData.media.videoLink);
    }
    if (formData.media.virtualTourLink) {
        data.append('3d_tour_link', formData.media.virtualTourLink);
    }

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit property. Please check your inputs.');
      }

      const result = await response.json();
      
      toast.success(result.message || 'Property submitted successfully for review!');
      
      // Optionally, reset the form on success
      // resetForm();

    } catch (err) {
      setLoading(false);
      toast.error(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handlePinOnMap = () => {
    toast.info('In a live application, this button would open an interactive map to pinpoint the exact location and fetch coordinates automatically.');
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto my-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Upload Your Property on 1metersquares.com
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help us showcase your project to the right buyers. Please provide comprehensive details about your property.
          </p>
          <p className="text-sm text-red-600 mt-4 font-semibold">
            **Important:** All projects listed on 1metersquares.com that are subject to RERA's mandatory registration requirements **must be RERA registered**.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">1. Uploader Details & Legal Compliance</h2>
            <p className="text-gray-700 mb-6">
              Please tell us who is uploading this property. This helps us ensure legal compliance and proper communication.
            </p>

            <div className="mb-6">
              <Label htmlFor="uploaderType" className="block text-gray-700 text-sm font-medium mb-2">I am a: <span className="text-red-500">*</span></Label>
              <select
                id="uploaderType"
                name="uploaderType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                value={formData.uploaderType}
                onChange={handleChange}
              >
                <option value="">Select your role</option>
                <option value="individual">Individual Property Owner</option>
                <option value="builder">Builder / Developer</option>
                <option value="agent">Real Estate Agent</option>
              </select>
            </div>

            {formData.uploaderType === 'individual' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Individual Owner Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="individual_pan">PAN Card Number <span className="text-red-500">*</span></Label>
                  <Input type="text" id="individual_pan" name="individual_pan" placeholder="e.g., ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" title="Please enter a valid PAN Card number (e.g., ABCDE1234F)" required={formData.uploaderType === 'individual'} value={formData.individual.pan} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="individual_aadhaar">Aadhaar Card Number</Label>
                  <Input type="text" id="individual_aadhaar" name="individual_aadhaar" placeholder="e.g., 1234 5678 9012" pattern="[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}" title="Please enter a valid 12-digit Aadhaar number" value={formData.individual.aadhaar} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="individual_phone1">Primary Phone Number <span className="text-red-500">*</span></Label>
                  <Input type="tel" id="individual_phone1" name="individual_phone1" placeholder="e.g., +91 9876543210" required={formData.uploaderType === 'individual'} value={formData.individual.phone1} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="individual_phone2">Secondary Phone Number (Optional)</Label>
                  <Input type="tel" id="individual_phone2" name="individual_phone2" placeholder="e.g., +91 9876543211" value={formData.individual.phone2} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="individual_email">Email Address <span className="text-red-500">*</span></Label>
                  <Input type="email" id="individual_email" name="individual_email" placeholder="e.g., yourname@example.com" required={formData.uploaderType === 'individual'} value={formData.individual.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="individual_address">Residential Address (Optional)</Label>
                  <Textarea id="individual_address" name="individual_address" rows="3" placeholder="Flat No., Building Name, Street, Locality, Pincode" value={formData.individual.address} onChange={handleChange}></Textarea>
                </div>
              </div>
            )}

            {formData.uploaderType === 'builder' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Builder / Developer Details</h3>
                <p className="text-gray-700">
                  Please provide your company's complete details. This form will be a separate component that you can route to.
                </p>
                <Button
                  type="button"
                  className="w-full text-lg font-semibold h-12"
                  onClick={() => navigate('/builder-company-details')}
                >
                  Provide Company Details
                </Button>
              </div>
            )}

            {formData.uploaderType === 'agent' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Real Estate Agent Details</h3>
                <p className="text-gray-700">
                  Please provide your agency's complete business information. This form will be a separate component that you can route to.
                </p>
                <Button
                  type="button"
                  className="w-full text-lg font-semibold h-12"
                  onClick={() => navigate('/agent-business-details')}
                >
                  Provide Agency Details
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">2. Property Overview <span className="text-gray-500 text-base font-normal">(Most Searched by Buyers)</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type <span className="text-red-500">*</span></Label>
                <select id="property_type" name="property_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required value={formData.property.type} onChange={handleChange}>
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa/House</option>
                  <option value="plot">Plot/Land</option>
                  <option value="commercial-office">Commercial Office Space</option>
                  <option value="commercial-shop">Commercial Shop/Showroom</option>
                  <option value="commercial-other">Other Commercial</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_transactionType">Transaction Type <span className="text-red-500">*</span></Label>
                <select id="property_transactionType" name="property_transactionType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required value={formData.property.transactionType} onChange={handleChange}>
                  <option value="">Select Transaction Type</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent/Lease</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_city">City <span className="text-red-500">*</span></Label>
                <Input type="text" id="property_city" name="property_city" placeholder="e.g., Mumbai, Bengaluru" required value={formData.property.city} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_locality">Locality / Area <span className="text-red-500">*</span></Label>
                <Input type="text" id="property_locality" name="property_locality" placeholder="e.g., Whitefield, Andheri West" required value={formData.property.locality} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_projectName">Project / Society Name</Label>
                <Input type="text" id="property_projectName" name="property_projectName" placeholder="e.g., Prestige Shantiniketan" value={formData.property.projectName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_totalPrice">Expected Total Price (INR) <span className="text-red-500">*</span></Label>
                <Input type="number" id="property_totalPrice" name="property_totalPrice" placeholder="e.g., 15000000" required min="100000" value={formData.property.totalPrice} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="property_bhk">Bedrooms (BHK) <span className="text-red-500">*</span></Label>
                <select id="property_bhk" name="property_bhk" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required value={formData.property.bhk} onChange={handleChange}>
                  <option value="">Select BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_carpetArea">Carpet Area (Sq. Ft.) <span className="text-red-500">*</span></Label>
                <Input type="number" id="property_carpetArea" name="property_carpetArea" placeholder="e.g., 950" required min="1" value={formData.property.carpetArea} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">3. Precise Location & Nearby Landmarks</h2>
            <p className="text-gray-700 mb-6">
              Provide exact coordinates for precise mapping. In a live system, this would be integrated with an interactive map.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_longitude">Longitude</Label>
                <Input type="text" id="property_longitude" name="property_longitude" placeholder="e.g., 77.5946" value={formData.property.longitude} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_latitude">Latitude</Label>
                <Input type="text" id="property_latitude" name="property_latitude" placeholder="e.g., 12.9716" value={formData.property.latitude} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-8">
              <Button type="button" className="text-lg font-semibold h-12" onClick={handlePinOnMap}>
                Pin on Map (Future Feature)
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                (Note: For this demo, please manually enter Longitude and Latitude. In a live version, this would be automated.)
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Nearby Important Places <span className="text-gray-500 text-base font-normal">(Manually Add - Auto-populated in Live System)</span></h3>
            <p className="text-gray-700 mb-4">
              Please list key nearby facilities and their approximate distances.
            </p>
            <div id="nearby-landmarks-container" className="space-y-4 mb-6">
              {formData.landmarks.map((landmark, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 landmark-entry">
                  <div className="space-y-2">
                    <Label htmlFor={`landmark-type-${index}`}>Type (e.g., School, Hospital, Metro Station)</Label>
                    <Input type="text" id={`landmark-type-${index}`} name="type" placeholder="e.g., School" value={landmark.type} onChange={(e) => handleLandmarkChange(index, e)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`landmark-name-${index}`}>Name & Distance (e.g., Apollo Hospital - 1.5 km)</Label>
                    <Input type="text" id={`landmark-name-${index}`} name="name" placeholder="e.g., Apollo Hospital - 1.5 km" value={landmark.name} onChange={(e) => handleLandmarkChange(index, e)} />
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="secondary" onClick={addLandmarkField}>+ Add Another Landmark</Button>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">4. Property Specifics & Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_projectStatus">Project Status <span className="text-red-500">*</span></Label>
                <select id="property_projectStatus" name="property_projectStatus" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required value={formData.property.projectStatus} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="ready-to-move">Ready to Move</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="new-launch">New Launch</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_reraId">Property RERA Registration ID <span className="text-red-500">*</span></Label>
                <Input type="text" id="property_reraId" name="property_reraId" placeholder="e.g., PRM/KA/RERA/1251/310/PR/XXXXXX/XXXXXX" required value={formData.property.reraId} onChange={handleChange} />
                <p className="text-xs text-gray-500 mt-1">Mandatory for RERA-applicable projects. This is for the property itself.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_possessionDate">Expected Possession Date (for Under Construction)</Label>
                <Input type="date" id="property_possessionDate" name="property_possessionDate" value={formData.property.possessionDate} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_builtUpArea">Built-up Area (Sq. Ft.)</Label>
                <Input type="number" id="property_builtUpArea" name="property_builtUpArea" placeholder="e.g., 1200" min="1" value={formData.property.builtUpArea} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_plotArea">Plot Area (Sq. Yards / Sq. Meters - if applicable)</Label>
                <Input type="number" id="property_plotArea" name="property_plotArea" placeholder="e.g., 150 (for plots/villas)" min="1" value={formData.property.plotArea} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_bathrooms">Number of Bathrooms</Label>
                <select id="property_bathrooms" name="property_bathrooms" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.property.bathrooms} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="property_furnishingStatus">Furnishing Status</Label>
                <select id="property_furnishingStatus" name="property_furnishingStatus" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.property.furnishingStatus} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_propertyAge">Property Age (Years)</Label>
                <Input type="number" id="property_propertyAge" name="property_propertyAge" placeholder="e.g., 2 (for resale)" min="0" value={formData.property.propertyAge} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <Label htmlFor="property_facing">Facing (Direction of Main Entrance)</Label>
              <select id="property_facing" name="property_facing" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.property.facing} onChange={handleChange}>
                <option value="">Select Direction</option>
                <option value="north">North</option>
                <option value="north-east">North-East</option>
                <option value="east">East</option>
                <option value="south-east">South-East</option>
                <option value="south">South</option>
                <option value="south-west">South-West</option>
                <option value="west">West</option>
                <option value="north-west">North-West</option>
              </select>
            </div>

            <div className="mb-6">
              <Label className="block text-gray-700 text-sm font-medium mb-2">Amenities & Features (Select all that apply)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(amenitiesList).map((category) => (
                  <React.Fragment key={category}>
                    <div className="col-span-full text-md font-semibold text-gray-800 mt-4 mb-2">{category}</div>
                    {amenitiesList[category].map((amenity) => (
                      <label key={amenity.value} className="flex items-center text-sm font-medium">
                        <input
                          type="checkbox"
                          name="amenities"
                          value={amenity.value}
                          className="h-3 w-3 rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                          checked={formData.amenities.includes(amenity.value)}
                          onChange={handleAmenityChange}
                        />
                        {amenity.label}
                      </label>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_description">Property Description <span className="text-red-500">*</span></Label>
              <Textarea id="property_description" name="property_description" rows="6" placeholder="Provide a detailed description of your property, highlighting key selling points, unique features, and proximity to landmarks." required value={formData.property.description} onChange={handleChange}></Textarea>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">5. Media & Visuals</h2>
            <p className="text-gray-700 mb-6">
              High-quality images and videos significantly increase buyer interest.
            </p>
            <div className="mb-6 space-y-2">
              <Label htmlFor="property_images">Property Images (Upload multiple files)</Label>
              <Input type="file" id="property_images" name="property_images" multiple accept="image/*" onChange={handleChange} />
              <p className="text-xs text-gray-500 mt-1">Max 10 images. Recommended resolution: 1920x1080px.</p>
            </div>
            <div className="mb-6 space-y-2">
              <Label htmlFor="property_videoLink">Video Tour Link (YouTube/Vimeo)</Label>
              <Input type="url" id="property_videoLink" name="property_videoLink" placeholder="e.g., https://www.youtube.com/watch?v=yourvideo" value={formData.media.videoLink} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property_virtualTourLink">3D Virtual Tour Link</Label>
              <Input type="url" id="property_virtualTourLink" name="property_virtualTourLink" placeholder="e.g., https://my.matterport.com/show/?m=yourtourid" value={formData.media.virtualTourLink} onChange={handleChange} />
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6 border-b-2 border-gray-200 pb-3">6. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              This information will be used to contact you regarding your listing and for lead delivery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="contact_person">Contact Person Name <span className="text-red-500">*</span></Label>
                <Input type="text" id="contact_person" name="contact_person" placeholder="e.g., Rajesh Kumar" required value={formData.contact.person} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email <span className="text-red-500">*</span></Label>
                <Input type="email" id="contact_email" name="contact_email" placeholder="e.g., sales@yourcompany.com" required value={formData.contact.email} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone Number <span className="text-red-500">*</span></Label>
              <Input type="tel" id="contact_phone" name="contact_phone" placeholder="e.g., +91 9876543210" required value={formData.contact.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 shadow-inner p-10 rounded-2xl">
            <h2 className="text-4xl font-bold text-yellow-800 mb-6 border-b-2 border-yellow-200 pb-3">Important Legal Disclaimers</h2>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-2 mb-6">
              <li>
                **RERA Compliance:** By submitting this form, you confirm that the project is either not subject to RERA registration or is **duly registered with the respective State RERA Authority**, and you have provided the correct RERA Registration ID for the property and/or your entity (Builder/Agent). You understand that 1metersquares.com will verify this information and reserves the right to unpublish any listing found to be non-compliant.
              </li>
              <li>
                **Accuracy of Information:** You, as the uploader, are solely responsible for the accuracy, completeness, and legality of all information, images, and media provided in this listing. Any misrepresentation may lead to legal action and removal of your listing from our platform.
              </li>
              <li>
                **Identity Verification:** For individuals, the PAN and Aadhaar card numbers are collected for identity verification purposes to enhance trust and security on the platform. This data will be handled in accordance with our Privacy Policy. For builders and agents, company/agency registration details are collected for similar verification and compliance.
              </li>
              <li>
                **No Brokerage/Agency:** 1metersquares.com operates strictly as an advertising and lead generation platform. We do not act as a real estate agent, broker, or intermediary in any property transaction. Our services are limited to providing visibility, marketing tools, and lead delivery.
              </li>
              <li>
                **Price Estimations:** All prices provided are **estimations** and may vary based on specific project requirements, customization, market conditions, and negotiation. Final pricing will be confirmed upon discussion and agreement with 1metersquares.com.
              </li>
              <li>
                **Third-Party Services:** While we may refer builders and buyers to third-party service providers (e.g., legal, financial, interior design), 1metersquares.com does not endorse, guarantee, or take responsibility for the services provided by these third parties. Any engagement with such providers is solely at the discretion and risk of the user. We do not receive commissions from these third-party transactions.
              </li>
              <li>
                **Market Data:** Market insights and data analytics are provided for informational purposes only and should not be considered financial or investment advice. Real estate market conditions can change rapidly, and users should consult with qualified professionals for specific investment decisions.
              </li>
              <li>
                By clicking "Submit Property," you agree to 1metersquares.com's <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </li>
            </ul>

            <Button type="submit" disabled={loading} className="w-full text-lg font-semibold h-12">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Property for Review"
              )}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default UploadPropertyForm;

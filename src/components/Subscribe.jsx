import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

const Subscribe = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loadingContact, setLoadingContact] = useState(false);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoadingContact(true);

    const backendUrl = '/api/contact-builder-services';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
        credentials: 'include',
      });

      setLoadingContact(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message. Please try again.');
      }

      const result = await response.json();
      toast.success(result.message || 'Your inquiry has been sent successfully!');
      
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

    } catch (err) {
      setLoadingContact(false);
      toast.error(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 my-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            1metersquares.com: Empowering Builders
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your strategic digital partner for **advertising, lead generation, and market intelligence**. We focus on maximizing your project's visibility and connecting you with discerning buyers, all while ensuring **full RERA compliance**.
          </p>
          <p className="text-sm text-red-600 mt-4 font-semibold">
            **Important Note:** All projects listed on 1metersquares.com that are subject to RERA's mandatory registration requirements **must be RERA registered**. We implement a verification step to ensure this compliance.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-4 mb-6">
            1. Property Listing and Enhanced Visibility Packages: <span className="text-indigo-600">Your Digital Showroom</span>
          </h2>
          <p className="text-gray-700 mb-8">
            "We offer a range of digital showcase solutions to put your projects in the spotlight, ensuring they reach a wide and targeted audience. Our role is to provide the advertising infrastructure, not to act as an intermediary in the sale."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Basic Listing</h3>
              <p className="text-gray-700 mb-4">
                "Upload essential project details, high-resolution images, and contact information. Your project will be visible in standard search results, reaching a broad audience without any upfront cost."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: Free</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Similar to free listing options available on major portals like 99acres.com and MagicBricks.com."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a passive advertising platform; 1metersquares.com does not negotiate or act on behalf of parties."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Premium Listing</h3>
              <p className="text-gray-700 mb-4">
                "Elevate your project's visibility with top positions in search results, category pages, and other prominent sections of our website. This package includes extensive media uploads, such as videos and 3D views, offering an immersive experience to potential buyers."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 30,000 - INR 80,000 (for 90 days)</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Offers significant value compared to market rates, where 'Featured New Project' options from competitors like 99acres and MagicBricks can range from INR 25,000 to INR 75,000 + GST for similar durations. Housing.com also offers 'top slot' positioning."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This service is purely for enhanced advertising exposure on the platform."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Carousel/Banner Advertising</h3>
              <p className="text-gray-700 mb-4">
                "Secure prominent graphical advertisements in high-traffic areas across the 1metersquares.com website, guaranteeing maximum brand exposure for your projects."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 8,000 - INR 20,000 per month</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Highly competitive: 99acres charges INR 80 per 1000 impressions (CPM) for banner advertising. MagicBricks also offers online advertisements."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a standard digital advertising service, not involving transactional mediation."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Video Tour Hosting & Promotion</h3>
              <p className="text-gray-700 mb-4">
                "Enables builders to host and promote captivating video tours and 360-degree virtual experiences of their properties directly on listings, providing an unparalleled viewing experience for prospective buyers."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 15,000 - INR 50,000 (for 90 days)</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Competitive with 99acres (INR 120 per month for 10-15 sec videos) and MagicBricks (Video Tour Packages at INR 56,000 for 20 slots over 90 days or INR 98,000 for 40 slots over 90 days). Housing.com also provides a '360 property visual experience'."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This enhances property viewing experience; 1metersquares.com is a content host."
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-4 mb-6">
            2. Lead Generation and Management Tools: <span className="text-indigo-600">Connecting You with High-Intent Buyers</span>
          </h2>
          <p className="text-gray-700 mb-8">
            "These services are meticulously designed to capture and streamline inquiries from prospective buyers, delivering them directly to your sales teams for efficient management. Our involvement ceases at lead delivery; the sales process remains entirely within your control."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Qualified Lead Delivery</h3>
              <p className="text-gray-700 mb-4">
                "Generates and forwards inquiries from high-intent prospective buyers directly to the builder's dashboard or CRM. Includes initial filtering based on user preferences."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 750 - INR 5,000+ per qualified lead</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Highly competitive with average Cost Per Lead (CPL) in India, which varies significantly: Affordable Homes (INR 500-1300), Budget Homes (INR 1000-2500), Luxury Homes (INR 2000-5000), Uber Luxury (INR 4000+). Overall real estate CPL can range from INR 2,000 to INR 25,000. Some agencies guarantee 60-80% qualified leads."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "1metersquares.com's role is limited to lead generation and delivery; actual negotiation and sale remain with the builder."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Integrated Lead Dashboard & Analytics</h3>
              <p className="text-gray-700 mb-4">
                "Provides builders with a centralized, intuitive dashboard to view, categorize, and manage all incoming leads, along with performance analytics for their listings."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: Included in Premium Listing/Lead Gen packages.</p>
              <p className="text-sm text-gray-600 mb-2">
                **Standalone CRM Integration:** INR 2,000 - INR 8,000 per month.
                **Comparison:** "Similar lead management tools and analytics are offered by 99acres. CRM software costs can range from $25-$100 (approx. INR 2,000 - INR 8,000) monthly per agent."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a software-as-a-service (SaaS) offering, assisting builders in their sales process without direct involvement in transactions."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Limited Lead Qualification</h3>
              <p className="text-gray-700 mb-4">
                "Utilizes automated or semi-automated processes to assess lead intent and filter inquiries, ensuring builders receive more relevant prospects."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: Included in higher-tier Lead Delivery packages.</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Housing.com mentions a 'Dedicated RM filters out only the best suited enquiries' for assisted packages. This demonstrates a market for pre-qualified leads."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This service is for lead filtering, not direct negotiation or acting as an agent."
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-4 mb-6">
            3. Digital Marketing and Promotion Support: <span className="text-indigo-600">Extending Your Reach</span>
          </h2>
          <p className="text-gray-700 mb-8">
            "Beyond the 1metersquares.com platform, we offer comprehensive digital marketing services to amplify your project's presence across a broader spectrum of online channels."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Search Engine Optimization (SEO) for Listings</h3>
              <p className="text-gray-700 mb-4">
                "Provides tools, insights, or managed services to optimize builder listings and profiles for higher organic search rankings on external search engines (e.g., Google), driving more natural traffic to your projects."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 15,000 - INR 40,000 per month</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Our targeted SEO campaigns offer a cost-effective alternative to general SEO services that can range significantly (less than $2,000 (approx. INR 1,60,000) per year for basic, up to $20,000 (approx. INR 16,00,000) per year for comprehensive packages). Leads via SEO typically cost $15-$50 (approx. INR 1,200 - INR 4,000) each."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a marketing service focused on increasing visibility, not direct sales."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Managed Social Media Advertising</h3>
              <p className="text-gray-700 mb-4">
                "Manages paid advertising campaigns on platforms like Facebook and Instagram to reach a wider, targeted audience for your projects."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 20,000 - INR 75,000 per month (plus ad spend)</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Our service provides expert management, aligning with industry standards where Facebook engagement rates average 0.21% with CPC at $0.88 (approx. INR 73), Instagram at 0.43% with CPC at $0.84 (approx. INR 70). Digital marketing agencies charge INR 5,000 to INR 15,000 per month for general lead generation services."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a pure advertising service, distinct from real estate brokerage."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Targeted Email/SMS Campaigns</h3>
              <p className="text-gray-700 mb-4">
                "Sends promotional messages about specific builder projects to a segmented and engaged user database, based on user preferences."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 5,000 - INR 25,000 per campaign</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Email marketing is highly cost-effective, with typical costs ranging from $3-$15 (approx. INR 250 - INR 1,250) per lead. MagicBricks and 99acres offer promotional messages via email/SMS."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a direct marketing service, not involving transactional negotiation."
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-4 mb-6">
            4. Ancillary Information and Value-Added Services: <span className="text-indigo-600">Enhancing Your Journey</span>
          </h2>
          <p className="text-gray-700 mb-8">
            "These services are designed to enrich the overall platform experience for both builders and buyers, providing invaluable additional support without direct involvement in transactions. Our focus remains on empowering your decision-making and connecting you with resources, not on acting as a transactional intermediary."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Market Insights & Data Analytics</h3>
              <p className="text-gray-700 mb-4">
                "Provides builders with access to comprehensive reports and dashboards on real estate market trends, price movements, and demand-supply dynamics, empowering you with data-driven decision-making. These insights are crucial for strategic planning and positioning your projects effectively."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: INR 5,000 - INR 20,000 per month (subscription-based)</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "MagicBricks offers 'PropIndex' and 'Property Pulse' for market insights. 99acres offers free market reports as a value-add. Our subscription offers detailed, actionable intelligence, going beyond basic reports with in-depth analysis and custom dashboards."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is an informational service, providing data and analysis. We do not provide transactional advice or act as an agent."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Enhanced Builder Profile Pages</h3>
              <p className="text-gray-700 mb-4">
                "Showcase your company's legacy and vision with dedicated, customizable pages where you can highlight your corporate profile, past successful projects, core values, and client testimonials, building trust and credibility with potential buyers."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: Included in Premium Listing packages.</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "Major portals like 99acres and MagicBricks offer similar features for builders to showcase their enterprise, reinforcing this as a standard and essential branding tool for developers."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "This is a branding and informational service, promoting your company and projects."
              </p>
            </div>

            <div className="card bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:transform hover:-translate-y-1 transition-transform duration-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Non-Commission-Based Referral Services</h3>
              <p className="text-gray-700 mb-4">
                "We facilitate connections by directing builders and buyers to reputable third-party service providers (e.g., legal consultants, financial advisors, interior designers, home inspection services). Importantly, we **do not receive any commission** from the subsequent transaction, ensuring our referrals are genuinely in the best interest of both parties. Our goal is simply to connect you with trusted, reliable resources."
              </p>
              <p className="text-indigo-600 font-bold text-xl mb-2">Price: Free (for basic referrals); Partnership fees for integrated solutions (negotiable)</p>
              <p className="text-sm text-gray-600 mb-2">
                **Comparison:** "MagicBricks offers a 'bouquet of 15+ services like expert advice, home loans, legal assistance to decor consultation'. 99acres offers consultations on legal and technical aspects. Unlike some platforms that might have commission-based referral models, ours is strictly non-commission-based to maintain neutrality."
              </p>
              <p className="text-sm text-red-500">
                **Legal Compliance Note:** "1metersquares.com acts as a facilitator for information and connections, not as a broker for these third-party services. We ensure no transactional involvement."
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 bg-yellow-50 rounded-xl shadow-inner border border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">General Legal Disclaimers</h2>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-2">
            <li>
              **RERA Compliance:** All projects listed on 1metersquares.com that are subject to RERA's mandatory registration requirements **must be RERA registered**. We implement a verification step to ensure this compliance, as online portals are prohibited from promoting unregistered projects in certain states.
            </li>
            <li>
              **No Brokerage/Agency Services:** 1metersquares.com operates strictly as an advertising and lead generation platform. We do not act as a real estate agent, broker, or intermediary in any property transaction. Our services are limited to providing visibility, marketing tools, and lead delivery.
            </li>
            <li>
              **Price Estimations:** All prices provided are **estimations** and may vary based on specific project requirements, customization, market conditions, and negotiation. Final pricing will be confirmed upon discussion and agreement with 1metersquares.com.
            </li>
            <li>
              **Third-Party Services:** While we may refer builders and buyers to third-party service providers (e.g., legal, financial, interior design), 1metersquares.com does not endorse, guarantee, or take responsibility for the services provided by these third parties. Any engagement with such providers is solely at the discretion and risk of the user. We do not receive commissions from these third-party transactions.
            </li>
            <li>
              **Information Accuracy:** While we strive to ensure the accuracy of information provided on our platform, builders are solely responsible for the truthfulness and legality of their project details, images, and other content uploaded. Users are advised to conduct their own due diligence.
            </li>
            <li>
              **Market Data:** Market insights and data analytics are provided for informational purposes only and should not be considered financial or investment advice. Real estate market conditions can change rapidly, and users should consult with qualified professionals for specific investment decisions.
            </li>
            <li>
              **Terms and Conditions:** Use of 1metersquares.com services is subject to our comprehensive Terms and Conditions and Privacy Policy, which users are encouraged to review.
            </li>
          </ul>
        </section>

        <section className="text-center p-6 bg-indigo-50 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Ready to Elevate Your Project?</h2>
          <p className="text-lg text-indigo-700 mb-6">
            Connect with us today to discuss a customized plan that fits your needs.
          </p>
          <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName" className="sr-only">Your Name</Label>
              <Input type="text" id="contactName" name="name" placeholder="Your Name" required value={contactFormData.name} onChange={handleContactChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="sr-only">Your Email</Label>
              <Input type="email" id="contactEmail" name="email" placeholder="Your Email" required value={contactFormData.email} onChange={handleContactChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="sr-only">Your Phone Number</Label>
              <Input type="tel" id="contactPhone" name="phone" placeholder="Your Phone Number" value={contactFormData.phone} onChange={handleContactChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactMessage" className="sr-only">Tell us about your project or specific needs...</Label>
              <Textarea id="contactMessage" name="message" placeholder="Tell us about your project or specific needs..." rows="4" value={contactFormData.message} onChange={handleContactChange}></Textarea>
            </div>
            <Button type="submit" disabled={loadingContact} className="w-full text-lg font-semibold h-12">
              {loadingContact ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                "Get a Custom Quote"
              )}
            </Button>
          </form>
        </section>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Subscribe;

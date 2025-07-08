import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

const agentData = {
  "samuel-wright": {
    name: "Samuel Wright",
    company: "Evergreen Estates",
    email: "samuel.wright@evergreenestates.com",
    phone: "(206) 555-6543",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
      "Samuel Wright's expertise in Property Management, Real Estate Appraising, and Real Estate Development allows him to offer comprehensive services to his clients. His analytical skills and proactive approach ensure that every project is executed flawlessly.",
    specialities:
      "Property Management, Real Estate Appraising, Real Estate Development",
    serviceArea: "Manchester, Kent, UK",
    officeAddress: "456 Pine Avenue, Suite 700, Kent, UK",
    listings: [], // You can add property objects here for the agent's listings
  },
  // Add more agents as needed
};

export default function AgentProfile() {
  const { agentName } = useParams();
  const agent = agentData[agentName];

  if (!agent) return <div className="p-8 text-center">Agent not found.</div>;

  return (
    <div className="w-full flex justify-center items-start">
      <div className="max-w-8xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-row gap-4 border-1 border-gray-100 rounded-2xl p-4 items-center">
            <img
              src={agent.profileImage}
              alt={agent.name}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl object-cover shadow"
            />
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-2xl sm:text-3xl mb-1 text-left">{agent.name}</h1>
              <div className="text-primary font-semibold mb-2 text-left">{agent.company}</div>
            </div>
          </div>
          {/* Service Area, Specialities */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4 justify-center">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{agent.serviceArea}</span>
            </div>
            <div className="mb-2 text-left">
              <span className="font-semibold">Specialities:</span> {agent.specialities}
            </div>
          </div>
          {/* Office, Bio */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <div className="mb-2 text-left">
              <span className="font-semibold">Office:</span> {agent.officeAddress}
            </div>
            <div className="mb-2 text-left">
              <span className="font-semibold">Bio:</span> {agent.about}
            </div>
          </div>
          {/* Contact */}
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <div className="mb-2 text-left">
              <span className="font-semibold">Contact:</span> {agent.email} | {agent.phone}
            </div>
          </div>
        </div>
        {/* Listings section can be added here */}
      </div>
    </div>
  );
}

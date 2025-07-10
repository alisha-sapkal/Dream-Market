import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    listings: [],
  },
};

export default function AgentProfile() {
  const { agentName } = useParams();
  const agent = agentData[agentName];
  const [showMessageOptions, setShowMessageOptions] = useState(false);

  if (!agent) return <div className="p-8 text-center">Agent not found.</div>;

  return (
    <div className="w-full flex justify-center items-start">
      <div className="max-w-8xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div 
            className="flex flex-col md:flex-row gap-4 border-1 border-gray-100 rounded-2xl p-4 items-center md:items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={agent.profileImage}
              alt={agent.name}
              className="w-full max-h-72 object-cover rounded-2xl shadow mb-4 md:mb-0"
            />
            <div className="flex flex-col justify-between gap-2 items-center md:items-start w-full">
              <h1 className="text-2xl sm:text-3xl mb-1 text-center md:text-left">
                {agent.name}
                <span className="text-sm text-gray-400 p-2">Agent</span>
              </h1>
              <div className="text-primary font-semibold mb-2 text-center md:text-left">
                <span className="text-sm text-gray-400 p-2">
                  Company Agent at
                </span>
                {agent.company}
              </div>
              <div className="flex flex-row gap-2 w-full justify-center md:justify-start relative">
                <div className="relative">
                  <button
                    className="w-full md:w-auto bg-black text-white text-md rounded-full px-4 py-1 cursor-pointer"
                    onClick={() => setShowMessageOptions((v) => !v)}
                    type="button"
                  >
                    Message
                  </button>
                  {showMessageOptions && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black rounded-t-xl"
                        onClick={() => {
                          window.location.href = `mailto:${agent.email}`;
                          setShowMessageOptions(false);
                        }}
                      >
                        Email
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black rounded-b-xl"
                        onClick={() => {
                          window.open(`https://wa.me/${agent.phone.replace(/[^\d]/g, '')}`);
                          setShowMessageOptions(false);
                        }}
                      >
                        WhatsApp
                      </button>
                    </div>
                  )}
                </div>
                <button className="w-full md:w-auto bg-gray-200 text-black text-md rounded-full px-4 py-1 cursor-pointer"
                  onClick={() => window.location.href = `tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                >
                  Call
                </button>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4 justify-center">
            <div className="flex flex-col items-start gap-2 mb-2">
              <span className="text-sm text-gray-400">Service Areas</span>
              <span>{agent.serviceArea}</span>
            </div>
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-sm text-gray-400">Specialities</span>
              <span>{agent.specialities}</span>
            </motion.div>
          </div>
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-md font-medium">Bio</span>
              <span className="text-sm text-gray-400">{agent.about}</span>
            </motion.div>
          </div>
          <div className="flex flex-col border-1 border-gray-100 rounded-2xl p-4">
            <motion.div 
              className="flex flex-col mb-2 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="text-lg font-semibold">Contact</span>
              <div className="flex flex-col mb-2 text-left">
                <span className="text-sm text-gray-400">Office:</span>
                <span>{agent.officeAddress}</span>
              </div>
              <div className="flex flex-col mb-2 text-left">
                <span className="text-sm text-gray-400">Phone:</span>
                <span>{agent.phone}</span>
              </div>
              <div className="flex flex-col mb-2 text-left">
                <span className="text-sm text-gray-400">Email:</span>
                <span>{agent.email}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

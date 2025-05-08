import React from "react";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  isActive: boolean;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedServiceId: string;
  onSelectService: (service: Service) => void;
  error?: string;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedServiceId,
  onSelectService,
  error,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Select a Service
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {services.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`relative group p-5 rounded-xl transition-all duration-200 cursor-pointer ${
                selectedServiceId === service.id
                  ? "bg-primary-50 ring-2 ring-primary-500 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 hover:shadow"
              }`}
            >
              <div className="flex justify-between">
                <h3
                  className={`font-semibold text-lg ${
                    selectedServiceId === service.id
                      ? "text-primary-700"
                      : "text-gray-800"
                  }`}
                >
                  {service.name}
                </h3>

                {selectedServiceId === service.id && (
                  <CheckCircle className="h-6 w-6 text-primary-500" />
                )}
              </div>

              <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">
                {service.description || "No description available"}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    ${Number(service.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{service.duration} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 rounded-xl bg-gray-50 border border-dashed border-gray-300">
          <div className="flex justify-center mb-4">
            <svg
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-gray-700 font-medium text-lg mb-2">
            No services available
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any services at this time. Please check back later
            or contact our support team for assistance.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;

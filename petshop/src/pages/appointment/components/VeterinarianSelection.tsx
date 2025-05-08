import React from "react";
import { User } from "lucide-react";

interface Vet {
  id: string;
  name: string;
}

interface VeterinarianSelectionProps {
  vets: Vet[];
  selectedVetId: string;
  onSelectVet: (vet: Vet) => void;
  error?: string;
}

const VeterinarianSelection: React.FC<VeterinarianSelectionProps> = ({
  vets,
  selectedVetId,
  onSelectVet,
  error,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Select Your Veterinarian
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {vets.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {vets.map((vet) => (
            <div
              key={vet.id}
              onClick={() => onSelectVet(vet)}
              className={`relative overflow-hidden group p-5 rounded-xl transition-all duration-200 cursor-pointer ${
                selectedVetId === vet.id
                  ? "bg-primary-50 ring-2 ring-primary-500 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedVetId === vet.id ? "bg-primary-100" : "bg-gray-200"
                  }`}
                >
                  <User
                    className={`h-8 w-8 ${
                      selectedVetId === vet.id
                        ? "text-primary-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      selectedVetId === vet.id
                        ? "text-primary-700"
                        : "text-gray-800"
                    }`}
                  >
                    Dr. {vet.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        selectedVetId === vet.id
                          ? "bg-primary-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <p className="text-sm text-gray-600">Available</p>
                  </div>
                </div>
              </div>

              {selectedVetId === vet.id && (
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
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
            No veterinarians available
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            There are no veterinarians available for the selected time slot.
            Please select a different date or time to see available options.
          </p>
        </div>
      )}
    </div>
  );
};

export default VeterinarianSelection;

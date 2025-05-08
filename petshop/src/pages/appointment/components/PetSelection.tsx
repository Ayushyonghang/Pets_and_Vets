import React from "react";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  imageUrl?: string;
}

interface PetSelectionProps {
  pets: Pet[];
  selectedPetId: string;
  isNewPet: boolean;
  petName: string;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  petWeight: string;
  onSelectPet: (pet: Pet) => void;
  onToggleNewPet: (isNew: boolean) => void;
  updateFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
}

const PetSelection: React.FC<PetSelectionProps> = ({
  pets,
  selectedPetId,
  isNewPet,
  petName,
  petSpecies,
  petBreed,
  petAge,
  petWeight,
  onSelectPet,
  onToggleNewPet,
  updateFormData,
  errors,
}) => {
  const speciesOptions = [
    "Dog",
    "Cat",
    "Bird",
    "Rabbit",
    "Rodent",
    "Reptile",
    "Other",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-primary-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white">Select Your Pet</h2>
        <p className="text-primary-100 text-sm mt-1">
          Choose an existing pet or add a new one to your profile
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="inline-flex w-full bg-gray-100 p-1 rounded-lg mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
                !isNewPet
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onToggleNewPet(false)}
            >
              Existing Pet
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
                isNewPet
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onToggleNewPet(true)}
            >
              Add New Pet
            </button>
          </div>
        </div>

        {!isNewPet ? (
          <div className="space-y-4">
            {errors.petId && (
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md mb-4 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.petId}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedPetId === pet.id
                      ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                      : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                  }`}
                  onClick={() => onSelectPet(pet)}
                >
                  <div className="flex items-center">
                    {pet.imageUrl ? (
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-primary-100 rounded-full mr-4 flex items-center justify-center text-primary-600 shadow-sm">
                        <span className="text-2xl">🐾</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {pet.species}
                        {pet.breed ? ` (${pet.breed})` : ""}
                      </p>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        {pet.age && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {pet.age} {pet.age === 1 ? "year" : "years"}
                          </span>
                        )}
                        {pet.weight && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {pet.weight} kg
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedPetId === pet.id && (
                      <div className="ml-auto">
                        <span className="bg-primary-500 text-white p-1 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pets.length === 0 && (
              <div className="bg-blue-50 border border-blue-100 text-blue-700 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-medium mb-1">No pets found</p>
                <p className="text-sm">
                  You don't have any pets registered yet. Please add a new pet
                  to continue.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => updateFormData({ petName: e.target.value })}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${
                    errors.petName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your pet's name"
                />
                {errors.petName && (
                  <p className="text-red-500 text-xs mt-1">{errors.petName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Species<span className="text-red-500">*</span>
                </label>
                <select
                  value={petSpecies}
                  onChange={(e) =>
                    updateFormData({ petSpecies: e.target.value })
                  }
                  className={`w-full p-3 border rounded-lg appearance-none bg-white pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${
                    errors.petSpecies
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="">Select species</option>
                  {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
                {errors.petSpecies && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.petSpecies}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Breed (optional)
                </label>
                <input
                  type="text"
                  value={petBreed}
                  onChange={(e) => updateFormData({ petBreed: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Enter breed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years) (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={petAge}
                  onChange={(e) => updateFormData({ petAge: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Enter age in years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg) (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={petWeight}
                  onChange={(e) =>
                    updateFormData({ petWeight: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Enter weight in kg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetSelection;

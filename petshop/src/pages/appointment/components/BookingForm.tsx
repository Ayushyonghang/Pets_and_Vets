import React, { useState } from "react";
import axios from "axios";
import ServiceSelection from "./ServiceSelection";
import PetSelection from "./PetSelection";
import DateTimeSelection from "./DateTimeSelection";
import VeterinarianSelection from "./VeterinarianSelection";
import NoteSection from "./NoteSection";
import ReviewBooking from "./ReviewBooking";
import ProgressSteps from "./ProgressSteps";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  isActive: boolean;
}

interface Veterinarian {
  id: string;
  fullName: string;
  specialization?: string;
  imageUrl?: string;
  isAvailable: boolean;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  imageUrl?: string;
}

interface FormData {
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  petId: string;
  petName: string;
  isNewPet: boolean;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  petWeight: string;
  date: string;
  time: string;
  vetId: string;
  vetName: string;
  notes: string;
  availableTimeSlots: string[];
  availableVets: Array<{ id: string; name: string }>;
  availableVetsMap: Record<string, Array<{ id: string; name: string }>>;
}

interface BookingFormProps {
  services: Service[];
  vets: Veterinarian[];
  pets: Pet[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  services,
  vets,
  pets,
  onSubmit,
  isLoading,
}) => {
  const steps = [
    { id: 1, name: "Service" },
    { id: 2, name: "Pet" },
    { id: 3, name: "Date & Time" },
    { id: 4, name: "Veterinarian" },
    { id: 5, name: "Notes" },
    { id: 6, name: "Review" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceId: "",
    serviceName: "",
    serviceDuration: 0,
    servicePrice: 0,
    petId: "",
    petName: "",
    isNewPet: false,
    petSpecies: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    date: "",
    time: "",
    vetId: "",
    vetName: "",
    notes: "",
    availableTimeSlots: [],
    availableVets: [],
    availableVetsMap: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const fetchAvailableTimeSlots = async (date: string, serviceId: string) => {
    if (!date || !serviceId) return { timeSlots: [], availableVetsMap: {} };

    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointments/veterinarians/available",
        {
          withCredentials: true,
          params: { date, serviceId },
        }
      );

      const { availableSlots } = response.data;

      const allTimeSlots: string[] = [];
      const availableVetsMap: Record<
        string,
        Array<{ id: string; name: string }>
      > = {};

      availableSlots.forEach((vet: any) => {
        vet.availableSlots.forEach((slot: string) => {
          if (!allTimeSlots.includes(slot)) {
            allTimeSlots.push(slot);
          }

          if (!availableVetsMap[slot]) {
            availableVetsMap[slot] = [];
          }

          availableVetsMap[slot].push({
            id: vet.vetId,
            name: vet.vetName,
          });
        });
      });

      return {
        timeSlots: allTimeSlots.sort(),
        availableVetsMap,
      };
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      return { timeSlots: [], availableVetsMap: {} };
    }
  };

  const handleServiceSelect = async (service: Service) => {
    updateFormData({
      serviceId: service.id,
      serviceName: service.name,
      serviceDuration: service.duration,
      servicePrice: service.price,
    });

    if (formData.date) {
      const { timeSlots, availableVetsMap } = await fetchAvailableTimeSlots(
        formData.date,
        service.id
      );
      updateFormData({
        availableTimeSlots: timeSlots,
        availableVetsMap,
      });
    }
  };

  const handleDateSelect = async (date: string) => {
    updateFormData({ date });

    if (formData.serviceId) {
      const { timeSlots, availableVetsMap } = await fetchAvailableTimeSlots(
        date,
        formData.serviceId
      );
      updateFormData({
        availableTimeSlots: timeSlots,
        availableVetsMap,
        time: "",
        vetId: "",
        vetName: "",
      });
    }
  };

  const handleTimeSelect = (time: string) => {
    const availableVets = formData.availableVetsMap[time] || [];
    updateFormData({
      time,
      availableVets,
      vetId: "",
      vetName: "",
    });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.serviceId) {
          newErrors.serviceId = "Please select a service";
        }
        break;
      case 2:
        if (!formData.isNewPet && !formData.petId) {
          newErrors.petId = "Please select a pet";
        }
        if (formData.isNewPet) {
          if (!formData.petName) newErrors.petName = "Name is required";
          if (!formData.petSpecies)
            newErrors.petSpecies = "Species is required";
        }
        break;
      case 3:
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.time) newErrors.time = "Please select a time";
        break;
      case 4:
        if (!formData.vetId) newErrors.vetId = "Please select a veterinarian";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const handlePetSelect = (pet: Pet) => {
    updateFormData({
      petId: pet.id,
      petName: pet.name,
      isNewPet: false,
    });
  };

  const handleNewPetToggle = (isNew: boolean) => {
    updateFormData({
      isNewPet: isNew,
      petId: isNew ? "" : formData.petId,
      petName: isNew ? formData.petName : "",
      petSpecies: isNew ? formData.petSpecies : "",
      petBreed: isNew ? formData.petBreed : "",
      petAge: isNew ? formData.petAge : "",
      petWeight: isNew ? formData.petWeight : "",
    });
  };

  const handleVetSelect = (vet: { id: string; name: string }) => {
    updateFormData({
      vetId: vet.id,
      vetName: vet.name,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            services={services}
            selectedServiceId={formData.serviceId}
            onSelectService={handleServiceSelect}
            error={errors.serviceId}
          />
        );
      case 2:
        return (
          <PetSelection
            pets={pets}
            selectedPetId={formData.petId}
            isNewPet={formData.isNewPet}
            petName={formData.petName}
            petSpecies={formData.petSpecies}
            petBreed={formData.petBreed}
            petAge={formData.petAge}
            petWeight={formData.petWeight}
            onSelectPet={handlePetSelect}
            onToggleNewPet={handleNewPetToggle}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <DateTimeSelection
            selectedDate={formData.date}
            selectedTime={formData.time}
            availableTimeSlots={formData.availableTimeSlots}
            onSelectDate={handleDateSelect}
            onSelectTime={handleTimeSelect}
            errors={errors}
          />
        );
      case 4:
        return (
          <VeterinarianSelection
            vets={formData.availableVets}
            selectedVetId={formData.vetId}
            onSelectVet={handleVetSelect}
            error={errors.vetId}
          />
        );
      case 5:
        return (
          <NoteSection notes={formData.notes} updateFormData={updateFormData} />
        );
      case 6:
        return <ReviewBooking formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <ProgressSteps steps={steps} currentStep={currentStep} />

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="py-2">
          {renderStep()}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </button>
            )}

            <div className="flex-1"></div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Next
                <ArrowRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Booking...
                  </span>
                ) : (
                  <>
                    <Check size={16} className="mr-1" />
                    Book Appointment
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

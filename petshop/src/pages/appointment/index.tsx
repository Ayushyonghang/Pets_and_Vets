import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BookingForm from "./components/BookingForm";

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

const AppointmentBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [servicesRes, vetsRes, petsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/appointments/services", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/appointments/veterinarians", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/appointments/user/pets", {
            withCredentials: true,
          }),
        ]);

        setServices(servicesRes.data.services);
        setVets(vetsRes.data.veterinarians);
        setPets(petsRes.data.pets);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load appointment data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);

      let petId = formData.petId;

      if (formData.isNewPet) {
        const newPetData = {
          name: formData.petName,
          species: formData.petSpecies,
          breed: formData.petBreed || undefined,
          age: formData.petAge ? parseInt(formData.petAge, 10) : undefined,
          weight: formData.petWeight
            ? parseFloat(formData.petWeight)
            : undefined,
        };

        const newPetResponse = await axios.post(
          "http://localhost:3000/api/appointments/pets",
          newPetData,
          {
            withCredentials: true,
          }
        );
        petId = newPetResponse.data.pet.id;

        setPets((prevPets) => [...prevPets, newPetResponse.data.pet]);
      }

      const appointmentData = {
        petId,
        serviceId: formData.serviceId,
        vetId: formData.vetId,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || undefined,
      };

      await axios.post(
        "http://localhost:3000/api/appointments/book",
        appointmentData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error booking appointment:", error);
      let errorMessage = "Failed to book appointment. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book Your Vet Appointment
      </h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <BookingForm
          services={services}
          vets={vets}
          pets={pets}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AppointmentBookingPage;

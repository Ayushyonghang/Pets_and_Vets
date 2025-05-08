import React from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  AlertCircle,
  Check,
} from "lucide-react";

interface ReviewBookingProps {
  formData: {
    serviceId: string;
    serviceName: string;
    serviceDuration: number;
    servicePrice: number;
    petId: string;
    petName: string;
    isNewPet: boolean;
    petSpecies: string;
    petBreed: string;
    petAge?: string;
    petWeight?: string;
    date: string;
    time: string;
    vetId: string;
    vetName: string;
    notes: string;
  };
}

const ReviewBooking: React.FC<ReviewBookingProps> = ({ formData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  interface SummaryItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
  }

  const SummaryItem = ({
    icon,
    label,
    value,
    highlight = false,
  }: SummaryItemProps) => (
    <div className={`flex py-4 ${highlight ? "bg-primary-50" : ""}`}>
      <div className="w-12 flex-shrink-0 flex justify-center">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p
          className={`font-medium ${
            highlight ? "text-primary-700" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-primary-600 py-6 px-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Review Your Booking
        </h2>
        <p className="text-primary-100">
          Please verify all details before confirming your appointment
        </p>
      </div>

      <div className="p-6">
        <div className="border rounded-xl overflow-hidden mb-8 shadow-sm divide-y divide-gray-100">
          <div className="bg-gray-50 p-4">
            <h3 className="text-gray-800 font-semibold">Appointment Details</h3>
          </div>

          <SummaryItem
            icon={<Calendar className="text-primary-500 h-5 w-5" />}
            label="Date"
            value={formatDate(formData.date)}
            highlight={true}
          />

          <SummaryItem
            icon={<Clock className="text-primary-500 h-5 w-5" />}
            label="Time"
            value={formatTime(formData.time)}
            highlight={true}
          />

          <SummaryItem
            icon={<User className="text-gray-500 h-5 w-5" />}
            label="Veterinarian"
            value={`Dr. ${formData.vetName}`}
          />

          <SummaryItem
            icon={<span className="text-lg">🐾</span>}
            label="Pet"
            value={
              <div>
                {formData.petName}
                {formData.isNewPet && formData.petSpecies && (
                  <span className="text-gray-500 ml-1 text-sm">
                    ({formData.petSpecies}
                    {formData.petBreed ? `, ${formData.petBreed}` : ""})
                  </span>
                )}
              </div>
            }
          />

          <SummaryItem
            icon={<DollarSign className="text-green-600 h-5 w-5" />}
            label="Service"
            value={
              <div className="flex flex-col">
                <span>{formData.serviceName}</span>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="font-semibold text-green-700">
                    {formatPrice(formData.servicePrice)}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500">
                    {formData.serviceDuration} minutes
                  </span>
                </div>
              </div>
            }
          />

          {formData.notes && (
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">Notes</p>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                {formData.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="mr-3 mt-0.5">
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Confirmation</h4>
            <p className="text-sm text-blue-700">
              Please review your appointment details carefully. Once confirmed,
              you'll receive a confirmation email with these details and
              instructions for your visit.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-blue-700">
              {[
                {
                  icon: <Check className="h-3 w-3" />,
                  text: "24-hour cancellation policy",
                },
                {
                  icon: <Check className="h-3 w-3" />,
                  text: "Arrive 10 minutes early",
                },
                {
                  icon: <Check className="h-3 w-3" />,
                  text: "Bring pet records",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBooking;

import React from "react";
import { Info, AlertTriangle, Clock } from "lucide-react";

interface NoteSectionProps {
  notes: string;
  updateFormData: (data: Record<string, any>) => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ notes, updateFormData }) => {
  const maxLength = 500;
  const charCount = notes.length;
  const charPercentage = (charCount / maxLength) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Additional Information
      </h2>

      <div className="flex items-start p-4 mb-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-blue-700 text-sm">
          Share any information that might help the veterinarian prepare for
          your appointment, such as symptoms, concerns, medication history, or
          specific questions.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optional)
        </label>
        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            maxLength={maxLength}
            className="w-full p-4 h-36 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            placeholder="Describe any symptoms, concerns, or special requirements..."
          />
          <div className="absolute bottom-3 right-3 flex items-center">
            <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  charPercentage > 80 ? "bg-amber-500" : "bg-primary-500"
                }`}
                style={{ width: `${charPercentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {charCount}/{maxLength}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 bg-amber-100 border-b border-amber-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-amber-800 font-semibold">
              Important Reminders
            </h3>
          </div>
        </div>

        <div className="p-4">
          <ul className="space-y-3">
            {[
              {
                icon: <Clock className="h-4 w-4" />,
                text: "Please arrive 10 minutes before your appointment time.",
              },
              {
                icon: "📋",
                text: "Bring any previous medical records if this is your pet's first visit.",
              },
              {
                icon: "🦮",
                text: "Ensure your pet is properly restrained for their safety.",
              },
              {
                icon: "⏰",
                text: "You can update or cancel your appointment up to 24 hours in advance.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 text-amber-700 mr-3">
                  {typeof item.icon === "string" ? (
                    item.icon
                  ) : (
                    <span className="flex items-center justify-center h-5 w-5 text-amber-600">
                      {item.icon}
                    </span>
                  )}
                </span>
                <span className="text-sm text-amber-800">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteSection;

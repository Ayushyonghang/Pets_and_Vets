import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  MapPin,
  Package,
  PawPrint,
  Heart,
  Edit,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

interface Pet {
  id: "string";
  ownerId: "string";
  name: "string";
  species: "string";
  breed: "string|null";
  age: "number|null";
  weight: "number|null";
  imageUrl: "string|null";
  createdAt: "string";
  updatedAt: "string";
}

const userData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  email: "pet.lover@example.com",
  fullName: "Jamie Smith",
  createdAt: "2023-04-15T14:30:00Z",
  addresses: [
    {
      id: "1",
      type: "Home",
      street: "123 Pet Avenue",
      city: "Petsville",
      state: "CA",
      zip: "90210",
    },
    {
      id: "2",
      type: "Work",
      street: "456 Animal Boulevard",
      city: "Petsville",
      state: "CA",
      zip: "90211",
    },
  ],
  recentOrders: [
    {
      id: "ORD-001",
      date: "2025-04-30",
      status: "Delivered",
      items: ["Premium Dog Food", "Chew Toy"],
    },
    {
      id: "ORD-002",
      date: "2025-04-22",
      status: "Processing",
      items: ["Cat Treats", "Scratching Post"],
    },
    {
      id: "VET-001",
      date: "2025-04-15",
      status: "Completed",
      items: ["Checkup for Max"],
    },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [pets, setPets] = useState<Pet[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointments/user/pets",
          {
            withCredentials: true,
          }
        );
        setPets(response.data.pets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };

    fetchUserPets();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const memberSince = formatDate(user!.createdAt);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="md:flex gap-6">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white">
                    {user!.fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center">
                  {user!.fullName}
                </h2>
                <p className="text-blue-100 text-center">{user!.email}</p>
                <p className="text-xs text-center mt-2 text-blue-100">
                  Member since {memberSince}
                </p>
              </div>

              <nav className="p-4">
                <ul>
                  <li className="mb-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center w-full p-3 rounded-md transition-colors ${
                        activeTab === "profile"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li className="mb-1">
                    <button
                      onClick={() => setActiveTab("pets")}
                      className={`flex items-center w-full p-3 rounded-md transition-colors ${
                        activeTab === "pets"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <PawPrint size={18} className="mr-3" />
                      <span>My Pets</span>
                    </button>
                  </li>
                  <li className="mb-1">
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center w-full p-3 rounded-md transition-colors ${
                        activeTab === "orders"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Package size={18} className="mr-3" />
                      <span>Orders</span>
                    </button>
                  </li>
                  <li className="mb-1">
                    <button
                      onClick={() => setActiveTab("addresses")}
                      className={`flex items-center w-full p-3 rounded-md transition-colors ${
                        activeTab === "addresses"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <MapPin size={18} className="mr-3" />
                      <span>Addresses</span>
                    </button>
                  </li>
                </ul>
                <div className="border-t mt-4 pt-4">
                  <button className="flex items-center w-full p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={18} className="mr-3" />
                    <span>Log Out</span>
                  </button>
                </div>
              </nav>
            </div>

            <div className="hidden md:block bg-white rounded-lg shadow mt-6 p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="flex items-center w-full p-3 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Calendar size={16} className="mr-2" />
                  <span>Book Vet Appointment</span>
                </button>
                <button className="flex items-center w-full p-3 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                  <ShoppingCart size={16} className="mr-2" />
                  <span>Shop Pet Supplies</span>
                </button>
                <button className="flex items-center w-full p-3 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                  <Heart size={16} className="mr-2" />
                  <span>Pet Pharmacy</span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        {user!.fullName}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Email Address
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        {user!.email}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Account ID
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md font-mono text-sm">
                      {user!.id}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Member Since
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      {memberSince}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pets" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Pets</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-400 relative">
                        <div className="absolute bottom-0 right-0 m-4">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <PawPrint size={32} className="text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{pet.name}</h3>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type</span>
                            <span className="font-medium">{pet.species}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Breed</span>
                            <span className="font-medium">{pet.breed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age</span>
                            <span className="font-medium">{pet.age} years</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Orders & Bookings</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
                        All
                      </button>
                      <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        Products
                      </button>
                      <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        Vet Visits
                      </button>
                      <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        Pharmacy
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Items
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userData.recentOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                {order.id}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                <ul>
                                  {order.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Processing"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.status === "Completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                <button>View Details</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Addresses</h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors">
                    <MapPin size={16} className="mr-2" />
                    Add Address
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {userData.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-white rounded-lg shadow p-6"
                    >
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                            <MapPin size={16} />
                          </div>
                          <h3 className="font-semibold">{address.type}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Edit size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-gray-600 space-y-1">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Set as Default
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:hidden bg-white rounded-lg shadow mt-6 p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Calendar size={16} className="mr-2" />
                  <span>Book Vet Visit</span>
                </button>
                <button className="flex items-center justify-center p-3 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                  <ShoppingCart size={16} className="mr-2" />
                  <span>Shop Supplies</span>
                </button>
                <button className="flex items-center justify-center p-3 text-sm rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                  <Heart size={16} className="mr-2" />
                  <span>Pet Pharmacy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

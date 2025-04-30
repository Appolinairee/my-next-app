"use client";

import Image from "next/image";
import { useState } from "react";
import ButtonLoading from "@/components/ButtonLoading";
import { useUserApi } from "@/components/useUserApi";
import SelectField from "@/components/SelectField";

type FilterType = "all" | "male" | "female";

const genderOptions = [
  { value: "all", label: "Tous" },
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
];

export default function UserList() {
  const { users, loading, error } = useUserApi(50);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredUsers: User[] =
    filter === "all" ? users : users.filter((user) => user.gender === filter);

  const handleFilterChange = (value: string | number) => {
    setFilter(value as FilterType);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>Erreur: {error}</p>
        <p>Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Liste des utilisateurs
      </h1>

      <div className="mx-auto relative">
        <SelectField
          label="Filtrer par genre"
          value={filter}
          onChange={handleFilterChange}
          options={genderOptions}
          placeholder="Sélectionner un genre"
          className="!w-[200px] py-2"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 flex justify-center">
          <ButtonLoading size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-x-[4%]">
          {filteredUsers.map((user) => (
            <div
              key={user.login.uuid}
              className="border border-black/20 rounded-[20px] p-4 shadow-soft hover:border-black/20 transition"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={user.picture.medium}
                  alt={`${user.name.first} ${user.name.last}`}
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {user.name.first} {user.name.last}
                  </h2>

                  <p className="text-sm text-gray-600 truncate">{user.email}</p>

                  <p className="text-sm">{user.location.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {users.length !== 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          {filteredUsers.length} utilisateurs affichés
        </div>
      )}
    </div>
  );
}

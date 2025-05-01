"use client";

import Image from "next/image";
import { useState } from "react";
import { useUserApi } from "@/components/user/useUserApi";
import SelectField from "@/components/base/SelectField";
import PageTitle from "@/components/PageTitle";
import { UserIcon } from "@/components/base/Icons";
import SearchBar from "@/components/base/SearchBar";
import { UserSkeletonList } from "@/components/user/UserListSkeleton";
import EmptySection from "@/components/base/EmptySection";

type FilterType = "all" | "male" | "female";

const genderOptions = [
  { value: "all", label: "Tous" },
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
];

export default function UserList() {
  const { users, loading, error } = useUserApi(50);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (value: string | number) => {
    setFilter(value as FilterType);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase());
  };

  const filteredUsers: User[] = users.filter((user) => {
    const genderMatch = filter === "all" || user.gender === filter;

    if (searchQuery.trim() === "") {
      return genderMatch;
    }

    const searchMatch =
      user.name.first.toLowerCase().includes(searchQuery) ||
      user.name.last.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery);

    return genderMatch && searchMatch;
  });

  return (
    <div className="container px-[5%] pb-8">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <PageTitle
          title="Utilisateurs"
          icon={<UserIcon className="w-5 h-5" />}
        />

        <div className="flex items-center gap-4">
          <SelectField
            value={filter}
            onChange={handleFilterChange}
            options={genderOptions}
            placeholder="Sélectionner un genre"
            className="!w-[200px] py-2"
          />

          <SearchBar
            onSearch={handleSearch}
            placeholder="Rechercher par nom,..."
            initialValue=""
            className="hidden xs:block"
          />
        </div>
      </div>

      {Boolean(loading) && <UserSkeletonList />}

      {!filteredUsers.length && !loading && (
        <EmptySection text="Aucun utilisateur pour le moment" />
      )}

      {error && !loading && Boolean(!users) && (
        <EmptySection
          text="Une erreur s'est produite. Veuillez réessayer."
          className="text-red-400"
        />
      )}

      {Boolean(filteredUsers.length) && (
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-x-[4%]">
          {filteredUsers.map((user) => (
            <div
              key={user.login.uuid}
              className="border border-black/5 rounded-[20px] p-4 shadow-soft  hover:border-white transition flex items-center space-x-4 overflow-hidden"
            >
              <Image
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {user.name.first} {user.name.last}
                </h2>

                <p className="text-sm text-gray-600 max-w-[240px] ellipsis">
                  {user.email}
                </p>

                <p className="text-sm">{user.location.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {filteredUsers.length} utilisateur
          {filteredUsers.length > 1 ? "s" : ""} affiché
          {filteredUsers.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

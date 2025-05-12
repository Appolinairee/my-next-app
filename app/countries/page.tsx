"use client";

import { useState } from "react";
import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import SelectField from "@/components/base/SelectField";
import SearchBar from "@/components/base/SearchBar";
import EmptySection from "@/components/base/EmptySection";
import { useCountriesApi } from "@/components/country/useCountriesApi";
import { BsGlobeAmericas } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { GiModernCity } from "react-icons/gi";
import { CountrySkeletonList } from "@/components/country/CountrySkeletonList";

export default function CountriesList() {
  const { countries, continents, loading, error } = useCountriesApi();
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleContinentChange = (value: string | number) => {
    setSelectedContinent(value as string);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase());
  };

  const formatNumber = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const filteredCountries = countries.filter((country) => {
    const continentMatch =
      selectedContinent === "all" ||
      country.continents.includes(selectedContinent);

    if (!searchQuery.trim()) return continentMatch;

    const nameMatch = country.name.common.toLowerCase().includes(searchQuery);

    return continentMatch && nameMatch;
  });

  return (
    <div className="container px-[5%] pb-8">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <PageTitle
          title="Pays"
          icon={<BsGlobeAmericas className="w-5 h-5" />}
        />

        <div className="flex items-center gap-4">
          <SelectField
            value={selectedContinent}
            onChange={handleContinentChange}
            options={[
              { value: "all", label: "Tous" },
              ...continents.map((c) => ({ value: c, label: c })),
            ]}
            placeholder="Sélectionner un continent"
            inputClass="!w-[200px] py-2"
            isSearchable
          />

          <SearchBar
            onSearch={handleSearch}
            placeholder="Rechercher par nom,..."
            initialValue=""
            className="hidden xs:block"
          />
        </div>
      </div>

      {Boolean(loading) && <CountrySkeletonList />}

      {!filteredCountries.length && !loading && (
        <EmptySection text="Aucun pays trouvé" />
      )}

      {error && !loading && !countries.length && (
        <EmptySection
          text="Une erreur est survenue. Veuillez réessayer."
          className="text-red-400"
        />
      )}

      {Boolean(filteredCountries.length) && (
        <>
          <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
            {filteredCountries.slice(0, 80).map((country) => (
              <div
                key={country.name.common}
                className="border border-black/10 rounded-[20px] shadow-soft hover:border-white transition overflow-hidden"
              >
                <div className="h-40 bg-gray-100 overflow-hidden rounded-[10px] mb-3">
                  <Image
                    src={country.flags.svg || country.flags.png}
                    alt={`Drapeau de ${country.name.common}`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold ellipsis ">
                      {country.name.common}
                    </h2>

                    <p className="text-sm bg-gray-100 px-2 py-[4px] rounded-full ellipsis">
                      {country.continents.join(", ")}
                    </p>
                  </div>

                  <p className="flex items-center gap-1 text-sm text-gray-700 mb-2">
                    <LuUsers />
                    Capitale:
                    <span className="font-medium">
                      {country.capital?.join(", ") || "N/A"}
                    </span>
                  </p>

                  <p className="flex gap-1 items-center text-sm text-gray-600">
                    <GiModernCity />
                    Population:
                    <span className="font-medium">
                      {formatNumber(country.population)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {filteredCountries.length} pays affiché
            {filteredCountries.length > 1 ? "s" : ""}
          </div>
        </>
      )}
    </div>
  );
}

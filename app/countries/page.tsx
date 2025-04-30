"use client";

import { useState } from "react";
import ButtonLoading from "@/components/ButtonLoading";
import SelectField from "@/components/SelectField";
import { useCountriesApi } from "@/components/useCountriesApi";
import Image from "next/image";

export default function CountriesList() {
  const { countries, continents, loading, error } = useCountriesApi();
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredCountries =
    selectedContinent === "all"
      ? countries
      : countries.filter((country) =>
          country.continents.includes(selectedContinent)
        );

  const continentOptions = [
    { value: "all", label: "Tous les continents" },
    ...continents.map((continent) => ({ value: continent, label: continent })),
  ];

  const handleContinentChange = (value: string | number) => {
    setSelectedContinent(value as string);
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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Informations sur les pays
      </h1>

      <div className="mb-6 max-w-xs mx-auto">
        <SelectField
          label="Filtrer par continent"
          value={selectedContinent}
          onChange={handleContinentChange}
          options={continentOptions}
          placeholder="Sélectionner un continent"
          inputClass="w-full py-2"
          isSearchable={true}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 flex justify-center">
          <ButtonLoading size={40} className="text-blue-500" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.name.common}
                className="bg-white border border-black/20 rounded-b-[30px] rounded-t-[20px] overflow-hidden shadow-soft"
              >
                <div className="h-40 overflow-hidden bg-gray-100">
                  <Image
                    src={country.flags.svg || country.flags.png}
                    alt={
                      country.flags.alt || `Drapeau de ${country.name.common}`
                    }
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {country.name.common}
                  </h2>
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <span className="font-medium">Capitale:</span>{" "}
                      {country.capital?.join(", ") || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Population:</span>{" "}
                      {formatNumber(country.population)}
                    </p>
                    <p>
                      <span className="font-medium">Continent:</span>{" "}
                      {country.continents.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            {filteredCountries.length} pays affichés
          </div>
        </>
      )}
    </div>
  );
}

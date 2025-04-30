"use client";

import { useState, useEffect } from "react";

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  area: number;
  continents: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
}

export function useCountriesApi() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [continents, setContinents] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error(`API response error: ${response.status}`);
        }

        const data: Country[] = await response.json();
        setCountries(data);

        const uniqueContinents = Array.from(
          new Set(data.flatMap((country) => country.continents))
        ).sort();

        setContinents(uniqueContinents);
      } catch (error) {
        console.error("Erreur lors du chargement des pays:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, continents, loading, error };
}

"use client";

import { useState } from "react";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";

import Table from "@/components/base/Table";
import ButtonLoading from "@/components/base/ButtonLoading";
import CryptoChart from "@/components/crypto/CryptoChart";
import CryptoTableRow from "./CryptoTableRow";
import { useCryptos } from "./useCrypto";
import SelectField from "@/components/base/SelectField";
import EmptySection from "@/components/base/EmptySection";
import SearchBar from "@/components/base/SearchBar";
import PageTitle from "@/components/PageTitle";

type VariationFilter = "all" | "positive" | "negative";

const variationOptions = [
  { value: "all", label: "Toutes" },
  { value: "positive", label: "Hausse" },
  { value: "negative", label: "Baisse" },
];

const columns = [
  { name: "Logo", width: "50px" },
  { name: "Nom", width: "160px" },
  { name: "Symbole", width: "100px" },
  { name: "Prix", width: "120px" },
  { name: "Cap. Marché", width: "140px" },
  { name: "Rang", width: "80px" },
  { name: "Volume", width: "140px" },
  { name: "24h %", width: "100px" },
  { name: "ATH", width: "120px" },
  { name: "Offre Max", width: "130px" },
  { name: "Mise à jour", width: "160px" },
];

export default function CryptoStatsClient() {
  const { data, loading, error } = useCryptos();
  const [search, setSearch] = useState("");
  const [variationFilter, setVariationFilter] =
    useState<VariationFilter>("all");

  const handleSearch = (value: string) => setSearch(value.toLowerCase());

  const handleVariationChange = (value: string | number) =>
    setVariationFilter(value as VariationFilter);

  const filteredData =
    data?.filter((coin) => {
      const matchesSearch = coin.name.toLowerCase().includes(search);

      const variation = coin.price_change_percentage_24h;
      const matchesVariation =
        variationFilter === "all" ||
        (variationFilter === "positive" && variation > 0) ||
        (variationFilter === "negative" && variation < 0);

      return matchesSearch && matchesVariation;
    }) ?? [];

  const sparklineData =
    filteredData.every((coin) => coin.sparkline_in_7d?.price) &&
    filteredData.length > 0
      ? filteredData.map((coin) => coin.sparkline_in_7d.price)
      : [];

  return (
    <div className="container px-[5%] pb-8">
      <div className="flex items-center justify-between flex-wrap gap-y-3 mb-6">
        <PageTitle
          title="Statistiques Crypto"
          icon={<PiCurrencyCircleDollarBold className="w-5 h-5" />}
        />

        <div className="flex gap-4 items-center">
          <SelectField
            value={variationFilter}
            onChange={handleVariationChange}
            options={variationOptions}
            placeholder="Filtrer variation"
            className="!w-[200px]"
          />

          <SearchBar
            onSearch={handleSearch}
            placeholder="Rechercher par nom,..."
            initialValue=""
            className="hidden xs:block"
          />
        </div>
      </div>
      {loading && <ButtonLoading className="" />}
      {error && <p className="text-red-500">Erreur : {error}</p>}
      {filteredData.length > 0 && (
        <>
          <Table<Crypto>
            data={filteredData}
            columns={columns}
            RowComponent={CryptoTableRow}
          />

          <CryptoChart sparkline={sparklineData} />
        </>
      )}

      {!loading && filteredData.length == 0 && (
        <EmptySection text="Aucune crypto-monnaie trouvée." />
      )}
    </div>
  );
}

"use client";

import Table from "@/components/base/Table";
import { useCryptos } from "./useCrypto";
import ButtonLoading from "@/components/ButtonLoading";
import CryptoTableRow from "./CryptoTableRow";
import CryptoChart from "@/components/CryptoChart";

export default function CryptoStatsClient() {
  const { data, loading, error } = useCryptos();

  if (loading) return <ButtonLoading />;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  const columns = [
    "Logo",
    "Nom",
    "Symbole",
    "Prix actuel ($)",
    "Capitalisation",
    "Rang",
    "Volume total",
    "Variation (%)",
    "ATH",
    "Offre maximale",
    "Dernière mise à jour",
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Statistiques Crypto</h1>
      <Table data={data} columns={columns} RowComponent={CryptoTableRow} />

      <CryptoChart
        sparkline={
          data?.every((coin) => coin.sparkline_in_7d?.price)
            ? data.map((coin) => coin.sparkline_in_7d.price)
            : []
        }
      />
    </div>
  );
}

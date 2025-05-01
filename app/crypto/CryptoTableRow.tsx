import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CryptoTableRow = ({ item }: { item: any }) => {
  return (
    <tr className="table-row">
      <td>
        <Image
          src={item.image}
          alt={item.name}
          height={30}
          width={30}
          className="w-6 h-6 rounded-full"
        />
      </td>

      <td>
        <p className="ellipsis">{item.name}</p>
      </td>

      <td>
        <p className="uppercase">{item.symbol}</p>
      </td>
      <td>
        <p>${item.current_price?.toLocaleString()}</p>
      </td>
      <td>
        <p>${item.market_cap?.toLocaleString()}</p>
      </td>
      <td>
        <p>{item.market_cap_rank}</p>
      </td>
      <td>
        <p>${item.total_volume?.toLocaleString()}</p>
      </td>
      <td>
        <p
          className={
            item.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {item.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </td>
      <td>
        <p>${item.ath?.toLocaleString()}</p>
      </td>

      <td>
        <p>{item.max_supply ? item.max_supply.toLocaleString() : "—"}</p>
      </td>

      <td className="whitespace-nowrap">
        <p>
          {new Date(item.last_updated)
            .toLocaleString("fr-FR", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replace(",", " à")}
        </p>
      </td>
    </tr>
  );
};

export default CryptoTableRow;

import { useState, useEffect } from "react";

export function useUserApi(count: number = 50) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://randomuser.me/api/?results=${count}`
        );

        if (!response.ok) {
          throw new Error(`API response error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [count]);

  return { users, loading, error };
}

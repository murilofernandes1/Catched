import { useState, useEffect } from "react";
import collection from "../services/collection";
import { CollectionProps } from "../types/cat-types";
import { UserProps } from "../types/auth-types";
export function useCollection() {
  const [collectionData, setCollectionData] = useState<CollectionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  useEffect(() => {
    async function fetchCollection() {
      setLoading(true);
      try {
        const data = await collection();
        setCollectionData(data);
        setUser(data[0]?.user || null);
      } catch (error) {
        console.log("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, []);
  return { collectionData, loading, user };
}

import { useEffect, useState } from 'react';

interface Tipo {
  tipid: number;
  tipnombre: string;
}

function useTipos() {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch('/api/tipo'); // Ruta relativa
        if (!response.ok) {
          throw new Error('Error al obtener tipos');
        }
        const data = await response.json();
        setTipos(data);
      } catch (err) {
        setError('Error al obtener tipos');
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, []);

  return { tipos, error, loading };
}

export default useTipos;

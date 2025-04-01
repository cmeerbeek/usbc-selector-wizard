import { useEffect, useState } from 'react';
import type { Product } from '../types';
import productsData from '../data/products.json';

export function useProducts(brand: string, model: string, peripheralType: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const key = `${brand}-${model}-${peripheralType}`;
        const foundProducts = productsData[key as keyof typeof productsData] || [];
        
        setProducts(foundProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (brand && model && peripheralType) {
      // Simulate network delay for a smoother UX
      setTimeout(fetchProducts, 300);
    }
  }, [brand, model, peripheralType]);

  return { products, loading, error };
}
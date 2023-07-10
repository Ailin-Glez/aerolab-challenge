import './ProductList.css';

import {
  useEffect,
  useState,
} from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProductItem } from '../models/aerolab-models';
import { sendRequest } from '../services/aerolab-service';
import Filter from './Filter';
import Product from './Product';

const compareProducts = (costA: number, costB: number, filterCriteria: string) => {
  return filterCriteria === "lowest" ? costA - costB : costB - costA;
};

function ProductList() {
  const { data: products, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: () => sendRequest<ProductItem[]>({ endpoint: "products" }) });
  const [filter, setFilter] = useState("recent");
  const [page, setPage] = useState(0);
  const totalProducts = products ? products.length : 0;
  const productsPerPage = page === 0 ? 16 : 32;

  useEffect(() => {
    setPage(0);
  }, [filter]);

  if (isError || isLoading) return null;

  const filteredProducts = filter !== "recent" ? products.slice().sort((a, b) => compareProducts(a.cost, b.cost, filter)) : products;
  const pages = [filteredProducts.slice(0, 16), filteredProducts.slice(16, totalProducts)];

  return (
    <main>
      {!products ? (
        <h3>No Products to show</h3>
      ) : (
        <>
          <Filter totalProducts={totalProducts} productsInPage={productsPerPage} filter={filter} handleArrowClick={(n) => setPage(n)} handleFilterChange={(f) => setFilter(f)} />
          <div className="divider-h"></div>
          <section className="cards-container">
            {pages[page].map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </section>
        </>
      )}
    </main>
  );
}

export default ProductList;

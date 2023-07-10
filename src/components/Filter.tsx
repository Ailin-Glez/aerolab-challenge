import './Filter.css';

import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import { FILTERS } from '../utils';

interface Props {
  totalProducts: number;
  productsInPage: number;
  filter: string;
  handleArrowClick: (n: number) => void;
  handleFilterChange: (filter: string) => void;
}

function Filter({ totalProducts, productsInPage, filter, handleFilterChange, handleArrowClick }: Props) {
  const arrow = productsInPage === 16 ? arrowRight : arrowLeft;
  const pageToGo = productsInPage === 16 ? 1 : 0;
  
  return (
    <section className="filter-container">
      <div className="counter-buttons">
        <span className="products-counter">
          {productsInPage} of {totalProducts} products
        </span>
        <div className="divider-v"></div>
        <div>
          <span>Sort by:</span>
          {FILTERS.map(({ name, label }) => (
            <button key={name} name={name} className={name === filter ? "active filter" : "filter"} onClick={() => handleFilterChange(name)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="arrows">
        <img className={pageToGo === 1 ? "arrow right" : "arrow left"} src={arrow} alt="arrow" onClick={() => handleArrowClick(pageToGo)} />
      </div>
    </section>
  );
}

export default Filter;

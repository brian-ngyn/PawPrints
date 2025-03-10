import { memo, useMemo, useState } from 'react';
import styles from './index.module.scss';
import PriceRange from '../../components/ShopPageComponents/PriceRange';
import RatingSelector from '../../components/ShopPageComponents/RatingSelector';
import CategorySelector from '../../components/ShopPageComponents/CategorySelector';
import BrandSelector from '../../components/ShopPageComponents/BrandSelector';
import OnSaleButton from '../../components/ShopPageComponents/OnSaleButton';
import { Rating } from 'react-simple-star-rating';

type Items = {
  id: number;
  name: string;
  starRating: number;
  price: number;
  category: string;
  onSale: boolean;
  regularPrice: number;
  salePrice: number | null;
  brand: string;
  src: string;
};

const Shop = () => {
  const items: Items[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Premium Dog Food',
        starRating: 4.5,
        price: 29.99,
        category: 'Food',
        onSale: true,
        regularPrice: 39.99,
        salePrice: 29.99,
        brand: 'Royal Canin',
        src: 'https://s7d2.scene7.com/is/image/PetSmart/5337879',
      },
      {
        id: 2,
        name: 'Cat Litter Box',
        starRating: 4.0,
        price: 19.99,
        category: 'Accessories',
        onSale: false,
        regularPrice: 19.99,
        salePrice: null,
        brand: 'Petmate',
        src: 'https://m.media-amazon.com/images/I/61Qp8dWizKL.jpg',
      },
      {
        id: 3,
        name: 'Chew Toy for Dogs',
        starRating: 4.7,
        price: 12.99,
        category: 'Toys',
        onSale: true,
        regularPrice: 15.99,
        salePrice: 12.99,
        brand: 'Kong',
        src: 'https://m.media-amazon.com/images/I/61eBrzrzWXL.jpg',
      },
      {
        id: 4,
        name: 'Bird Cage',
        starRating: 3.8,
        price: 49.99,
        category: 'Housing',
        onSale: false,
        regularPrice: 49.99,
        salePrice: null,
        brand: 'Prevue Hendryx',
        src: 'https://m.media-amazon.com/images/I/91g-0EYgvvL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        id: 5,
        name: 'Fish Tank Filter',
        starRating: 4.2,
        price: 24.99,
        category: 'Aquarium',
        onSale: true,
        regularPrice: 34.99,
        salePrice: 24.99,
        brand: 'Fluval',
        src: 'https://www.petland.ca/cdn/shop/files/fluval-fluval-07-series-external-canister-filter-29753314148454.jpg?v=1698691142',
      },
      {
        id: 6,
        name: 'Dog Leash',
        starRating: 4.6,
        price: 14.99,
        category: 'Accessories',
        onSale: false,
        regularPrice: 14.99,
        salePrice: null,
        brand: 'Flexi',
        src: 'https://s7d2.scene7.com/is/image/PetSmart/5268218',
      },
      {
        id: 7,
        name: 'Catnip Toy',
        starRating: 4.3,
        price: 8.99,
        category: 'Toys',
        onSale: true,
        regularPrice: 12.99,
        salePrice: 8.99,
        brand: 'Yeowww!',
        src: 'https://greenhawk.com/cdn/shop/products/17899.jpg?v=1689720428&width=1214',
      },
      {
        id: 8,
        name: 'Small Animal Bed',
        starRating: 4.1,
        price: 22.99,
        category: 'Housing',
        onSale: false,
        regularPrice: 22.99,
        salePrice: null,
        brand: 'Kaytee',
        src: 'https://s7d2.scene7.com/is/image/PetSmart/5278512',
      },
      {
        id: 9,
        name: 'Dog Collar',
        starRating: 4.4,
        price: 9.99,
        category: 'Accessories',
        onSale: true,
        regularPrice: 14.99,
        salePrice: 9.99,
        brand: 'Blueberry Pet',
        src: 'https://m.media-amazon.com/images/I/71amhDeu9HL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        id: 10,
        name: 'Aquarium Heater',
        starRating: 4.0,
        price: 29.99,
        category: 'Aquarium',
        onSale: false,
        regularPrice: 29.99,
        salePrice: null,
        brand: 'Eheim',
        src: 'https://m.media-amazon.com/images/I/51YoQo5pOZL.jpg',
      },
    ],
    [],
  );

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Filtered items based on state
  const filteredItems = items.filter((item) => {
    const isInPriceRange =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const meetsRating = item.starRating >= minRating;
    const isInSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    const isInSelectedBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const isOnSale = !onSaleOnly || item.onSale;

    return (
      isInPriceRange &&
      meetsRating &&
      isInSelectedCategory &&
      isInSelectedBrand &&
      isOnSale
    );
  });

  // Unique categories and brands for multi-select options
  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items],
  );
  const brands = useMemo(
    () => [...new Set(items.map((item) => item.brand))],
    [items],
  );

  return (
    <div className={styles.shopPage}>
      <div className={styles.pageHeading}>Shop</div>
      <div className={styles.filters}>
        <OnSaleButton onSaleOnly={onSaleOnly} setOnSaleOnly={setOnSaleOnly} />
        <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
        <CategorySelector
          allCategories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <BrandSelector
          allBrands={brands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />
        <RatingSelector minRating={minRating} setMinRating={setMinRating} />
      </div>

      <div className={styles.itemContainer}>
        {filteredItems.map((item) => (
          <div className={styles.item} key={item.id}>
            <img src={item.src} height={200} />
            <div id="brand">{item.brand}</div>
            <div id="name">{item.name}</div>
            <Rating
              size={25}
              readonly
              allowFraction
              iconsCount={5}
              initialValue={item.starRating}
            />
            <div id="price">
              ${item.onSale ? item.salePrice : item.regularPrice}
            </div>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Shop);

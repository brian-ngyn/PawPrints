import { memo, useMemo, useState } from 'react';
import styles from './index.module.scss';
import PriceRange from '../../components/ShopPageComponents/PriceRange';
import RatingSelector from '../../components/ShopPageComponents/RatingSelector';
import CategorySelector from '../../components/ShopPageComponents/CategorySelector';
import BrandSelector from '../../components/ShopPageComponents/BrandSelector';
import OnSaleButton from '../../components/ShopPageComponents/OnSaleButton';
import { Rating } from 'react-simple-star-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faChevronLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

type Item = {
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
  const items: Item[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Premium Dog Food',
        starRating: 2.5,
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
  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
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
      }),
    [priceRange, minRating, selectedCategories, selectedBrands, onSaleOnly],
  );

  const [itemsInCart, setItemsInCart] = useState<Item[]>([]);

  // Unique categories and brands for multi-select options
  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items],
  );
  const brands = useMemo(
    () => [...new Set(items.map((item) => item.brand))],
    [items],
  );

  const [showCartPage, setShowCartPage] = useState(false);

  const [showCheckoutScreen, setShowCheckoutScreen] = useState(false);

  return (
    <div className={styles.shopPage}>
      {!showCartPage ? (
        <>
          <div className={styles.pageHeading}>
            <div>Shop</div>
            <div
              className={styles.cartIcon}
              onClick={() => setShowCartPage(true)}
            >
              <FontAwesomeIcon icon={faCartShopping} size="xs" />
              <div className={styles.itemsInCart}>{itemsInCart.length}</div>
            </div>
          </div>
          <div className={styles.filters}>
            <OnSaleButton
              onSaleOnly={onSaleOnly}
              setOnSaleOnly={setOnSaleOnly}
            />
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
                  {item.onSale ? (
                    <>
                      <div style={{ textDecoration: 'line-through' }}>
                        ${item.regularPrice}
                      </div>
                      <div>${item.salePrice}</div>
                    </>
                  ) : (
                    <div>${item.regularPrice}</div>
                  )}
                </div>
                <button
                  className={styles.addToCartButton}
                  onClick={() => setItemsInCart((prev) => [...prev, item])}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {!showCheckoutScreen ? (
            <>
              <div className={styles.cartPageHeading}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="2xs"
                  onClick={() => setShowCartPage(false)}
                />
                <div>Cart</div>
              </div>
              <div className={styles.cartContainer}>
                <div className={styles.quantityHeader}>
                  Your Cart ({itemsInCart.length} items)
                </div>
                {[...new Set(itemsInCart)].map((item: Item) => (
                  <div className={styles.cartItem} key={item.id}>
                    <img src={item.src} height={200} />
                    <div className={styles.cartItemDescription}>
                      <div id="category">{item.category}</div>
                      <div id="brand">{item.brand}</div>
                      <div id="name">{item.name}</div>
                      <div id="price">
                        {item.onSale ? (
                          <>
                            <div style={{ textDecoration: 'line-through' }}>
                              ${item.regularPrice}
                            </div>
                            <div>${item.salePrice}</div>
                          </>
                        ) : (
                          <div>${item.regularPrice}</div>
                        )}
                      </div>
                    </div>
                    <div className={styles.quantitySelector}>
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() =>
                            setItemsInCart((prev) => {
                              return prev.filter((i) => i.id !== item.id);
                            })
                          }
                        />
                        <div
                          onClick={() =>
                            setItemsInCart((prev) => {
                              const newCart = [...prev];
                              newCart.splice(newCart.indexOf(item), 1);
                              return newCart;
                            })
                          }
                        >
                          -
                        </div>
                        <div>
                          {itemsInCart.filter((i) => i.id === item.id).length}
                        </div>
                        <div
                          onClick={() =>
                            setItemsInCart((prev) => {
                              return [...prev, item];
                            })
                          }
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.subtotal}>
                  Subtotal: $
                  {itemsInCart
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)}
                </div>
                <button
                  className={styles.checkoutButton}
                  onClick={() => setShowCheckoutScreen(true)}
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.cartPageHeading}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="2xs"
                  onClick={() => {
                    setItemsInCart([]);
                    setShowCartPage(false);
                    setShowCheckoutScreen(true);
                  }}
                />
                <div>Cart</div>
              </div>
              <div className={styles.checkoutScreen}>
                Checkout complete! Thank you for shopping with PawPrints!
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Shop);

import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectProductListStatus,
  selectTotalItems,
  selectcategories,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";
import { render } from "@testing-library/react";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectcategories);
  const status = useSelector(selectProductListStatus);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  console.log("total items is", totalItems);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setpage] = useState(1);

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    // TODO : on server it will support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setpage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    // TODO: server will filter the deleted products
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setpage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="bg-white">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Books
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
              {/* Product grid */}
              <div className="lg:col-span-3">
                {console.log("detail of total products ", products)}
                {/* <ProductGrid products={products} status={status}/> */}
                <ProductGrid products={products} status={status} />
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          <Pagination
            page={page}
            setpage={setpage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

// function ProductGrid({ products, status }) {
//   console.log("Products:", products);
//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <Grid
//           visible={true}
//           height="80"
//           width="80"
//           color="rgb(79,70,229)"
//           ariaLabel="grid-loading"
//           radius="12.5"
//           wrapperStyle={{}}
//           wrapperClass="grid-wrapper"
//         />
//       </div>
//     );
//   }

//   if (!Array.isArray(products)) {
//     return <div>No products found</div>; // Fallback if products is not an array
//   }

//   return (
//     <div className="bg-gray-50">
//       <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//         <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
//           {status === "loading" && (
//             <Grid
//               height="80"
//               width="80"
//               color="rgb(79, 70, 229)"
//               ariaLabel="grid-loading"
//               radius="12.5"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           )}
//           {products.map((product) => (
//             <Link to={`/product-detail/${product.id}`} key={product.id}>
//               <div className="group relative border-solid border-2 p-2 border-gray-200 bg-white rounded-md shadow-md hover:shadow-xl hover:border-indigo-500 transition-shadow duration-300 ease-in-out">
//                 <div className="min-h-60 lg:h-60 aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="object-cover object-center h-full w-full"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-800">{product.title}</h3>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       ₹{product.discountPrice}
//                     </p>
//                     <p className="text-sm line-through font-medium text-gray-500">
//                       ₹{product.price}
//                     </p>
//                   </div>
//                 </div>
//                 {product.deleted && (
//                   <div>
//                     <p className="text-sm text-red-500">Product deleted</p>
//                   </div>
//                 )}
//                 {product.stock <= 0 && (
//                   <div>
//                     <p className="text-sm text-red-500">Out of stock</p>
//                   </div>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

function ProductGrid({ products, status }) {
  console.log("Products:", products);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="rgb(79,70,229)"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return <div>No products found</div>; // Fallback if products is not an array
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="group relative border-solid border-2 p-2 border-gray-200 bg-white rounded-md shadow-md hover:shadow-xl hover:border-indigo-500 transition-shadow duration-300 ease-in-out">
                <div className="min-h-60 lg:h-60 aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover object-center h-full w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-800">{product.title}</h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{product.discountPrice}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-500">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
                {product.deleted && (
                  <div>
                    <p className="text-sm text-red-500">Product deleted</p>
                  </div>
                )}
                {product.stock <= 0 && (
                  <div>
                    <p className="text-sm text-red-500">Out of stock</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

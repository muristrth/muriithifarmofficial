import ProductList from "@/components/ProductList";
import Link from "next/link";
import { ChickenIcon } from "@/components/icons/FarmIcons";

export default function AndrewPoultryPage() {
  const poultryProducts = [
    {
      id: "p1",
      name: "Improved Kienyeji Chicken",
      description: "Slaughtered chicken with >2.5kg. These are pasture-raised Local chicken, fed with organic feed without antibiotics or hormones.",
      price: 1700,
      unit: "pc",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fgroups%2F2554158204897502%2Fposts%2F3265999267046722%2F&psig=AOvVaw27Fn9Igl9XV_VujzuRuBCS&ust=1742961043285000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDY6pCqpIwDFQAAAAAdAAAAABAJ",
      inStock: true,
    },
    {
      id: "p2",
      name: "Pure Kienyeji Eggs",
      description: "Delicate, white eggs with a high yolk-to-white ratio. Bright yellow yolk. Pack of 30.",
      price: 600,
      unit: "crate",
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: false,
    },
    {
      id: "p3",
      name: "Broiler Chicken",
      description: "2kg Large whole chicken perfect for Sunday roast. Approximately 2kg each.",
      price: 900,
      unit: "each",
      image: "https://images.unsplash.com/photo-1602526430780-782d6b1783fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: false,
    },
    {
      id: "p3",
      name: "Chicken Gizzards",
      description: "Fresh chicken gizzards.",
      price: 150,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1602526430780-782d6b1783fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: false,
    },
    {
      id: "p4",
      name: "Chicken Liver",
      description: "Fresh chicken livers, cleaned and ready to cook.",
      price: 200,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1600180883635-68d1169e6863?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      inStock: false,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-farm-green-700">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/products" className="text-gray-600 hover:text-farm-green-700 ml-1 md:ml-2">Products</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-500 ml-1 md:ml-2">Andrew Poultry Farm</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-farm-green-50 farm-pattern bg-pattern-sm p-6 flex items-center justify-center md:w-64">
              <ChickenIcon />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-farm-green-500 font-semibold">Premium Poultry Products</div>
              <h1 className="text-3xl font-bold text-farm-green-800 mt-1">Andrew Poultry Farm</h1>
              <p className="text-gray-600 mt-3">Free-range chicken and eggs from our family-owned poultry farm</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-farm-green-50 px-3 py-1 rounded-full text-farm-green-700 text-sm font-medium">
                  Cage-Free
                </div>
                <div className="bg-farm-green-50 px-3 py-1 rounded-full text-farm-green-700 text-sm font-medium">
                  Organic Feed
                </div>
                <div className="bg-farm-green-50 px-3 py-1 rounded-full text-farm-green-700 text-sm font-medium">
                  Antibiotic-Free
                </div>
                <div className="bg-farm-green-50 px-3 py-1 rounded-full text-farm-green-700 text-sm font-medium">
                  Pasture Raised
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-farm-green-50 p-6 rounded-lg mb-8 border border-farm-green-100">
          <h2 className="text-lg font-semibold text-farm-green-800 mb-3">About Our Poultry Farm</h2>
          <p className="text-gray-700 mb-4">
            At Andrew Poultry Farm, we raise our chickens in a stress-free environment with access to open pastures.
            Our chickens are fed with organic feed, free from antibiotics and growth hormones. This results in
            healthier, tastier meat and more nutritious eggs.
          </p>
          <p className="text-gray-700">
            All our poultry products are processed in our state-of-the-art facility that meets the highest
            standards of hygiene and quality. We take pride in providing you with the freshest,
            most ethically raised poultry products possible.
          </p>
        </div>
      </div>

      <ProductList products={poultryProducts} categoryName="Andrew Poultry Farm" />
    </div>
  );
}

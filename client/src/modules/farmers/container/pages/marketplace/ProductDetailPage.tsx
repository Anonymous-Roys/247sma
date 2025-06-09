'use client'
import {useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Star, Heart, Facebook, Twitter, Share2, HomeIcon } from 'lucide-react';
import { Product, ProductImage } from '@/shared/types/product';
import { Link } from 'react-router-dom';
import { CompactProductCard } from './FarmMarketplace';


import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/shared/lib/utils';




// Breadcrumb Component
const Breadcrumb = ({ product }: { product: Product }) => {
  return (
    <div 
      className="relative px-6 py-4 overflow-hidden bg-gray-50"
      style={{
        backgroundImage: "url('/images/Breadcrumbs.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      
      <div className="relative z-10">
        <nav 
          className="flex items-center space-x-2 text-sm text-white"
          aria-label="Breadcrumb"
        >
          {/* Home Link */}
          <Link 
            to="/" 
            className="flex items-center transition-colors hover:text-green-300"
          >
            <HomeIcon/>
          
          </Link>
          
          <span className="text-gray-300">/</span>
          
          {/* Products Page Link */}
          <Link 
            to="/products" 
            className="transition-colors hover:text-green-300"
          >
            Products
          </Link>
          
          <span className="text-gray-300">/</span>
          
          {/* Category - Non-clickable */}
          <span className="text-gray-200 capitalize">{product.categories[0]}</span>
          
          <span className="text-gray-300">/</span>
          
          {/* Current Product */}
          <span className="font-medium text-green-300">{product.name}</span>
        </nav>

      </div>
    </div>
  );
};


// Image Gallery Component  
const ImageGallery = (
  { images, discount }
  :
  { images: ProductImage[]; discount: number}
) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const THUMBNAILS_TO_SHOW = 4;

  const scrollThumbnailsUp = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    }
  };

  const scrollThumbnailsDown = () => {
    if (thumbnailStartIndex + THUMBNAILS_TO_SHOW < images.length) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  return (
    <div className="flex">
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex flex-col items-center mr-4">
          <button
            onClick={scrollThumbnailsUp}
            disabled={thumbnailStartIndex === 0}
            className={`mb-2 p-1 rounded ${thumbnailStartIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronUp size={20} />
          </button>

          <div className="flex flex-col space-y-2">
            {images.slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_TO_SHOW).map((image, index) => {
              const actualIndex = thumbnailStartIndex + index;
              return (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(actualIndex)}
                  className={`relative h-16 w-16 overflow-hidden rounded border-2 ${selectedImageIndex === actualIndex ? 'border-green-500' : 'border-gray-200'
                    }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                    width={50}
          height={50}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={scrollThumbnailsDown}
            disabled={thumbnailStartIndex + THUMBNAILS_TO_SHOW >= images.length}
            className={`mt-2 p-1 rounded ${thumbnailStartIndex + THUMBNAILS_TO_SHOW >= images.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden border rounded-lg aspect-square">
        <img
          src={images[selectedImageIndex]?.url}
          alt={images[selectedImageIndex]?.alt}
          className="object-cover w-full h-full"
          width={50}
          height={50}
        />
        {discount > 0 && (
          <div className="absolute px-3 py-1 text-sm font-medium text-white bg-red-500 rounded top-4 left-4">
            {discount}% Off
          </div>
        )}
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo = ({
  product,
}: {
  product: Product;
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);


  const selectedVariant = product.variants[selectedVariantIndex];

 

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(selectedVariant.price);

  const formattedComparedPrice = selectedVariant.comparedAtPrice
    ? new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(selectedVariant.comparedAtPrice)
    : null;

  const discount = selectedVariant.comparedAtPrice
    ? Math.round(((selectedVariant.comparedAtPrice - selectedVariant.price) / selectedVariant.comparedAtPrice) * 100)
    : 0;
 const discountedPrice = discount
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(selectedVariant.price * (1 - discount / 100))
      : null;
      


  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.averageRating) ? "fill-current" : ""}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviewCount} Review{product.reviewCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                SKU: <span className="text-gray-900">{selectedVariant.sku}</span>
              </div>
            </div>
          </div>
          <span className={`inline-block rounded px-3 py-1 text-sm font-medium ${selectedVariant.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}>
            {selectedVariant.isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">{formattedPrice}</span>
            {formattedComparedPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">{formattedComparedPrice}</span>
                <span className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                  {discountedPrice}% Off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <span className="text-gray-600">Brand: </span>
          <div className="inline-flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-2 bg-green-100 rounded-full">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-gray-700">{product.shortDescription}</p>

        {/* Variants */}
        {product.variants.length > 1 && (
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-gray-900">Available Options</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantIndex(index)}
                  disabled={!variant.isAvailable}
                  className={`rounded-lg border px-4 py-2 text-sm transition-all ${selectedVariantIndex === index
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    } ${!variant.isAvailable && 'cursor-not-allowed opacity-50'}`}
                >
                  {variant.name} - {variant.weight}{variant.weightUnit}
                </button>
              ))}
            </div>
          </div>
        )}

      

        {/* Product Info */}
        <div className="pt-6 mt-6 space-y-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <div className="mt-1">
                {product.categories.map((category) => (
                  <button
                    key={category}
                    className="mr-2 text-green-600 capitalize hover:text-green-700"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <span className="text-gray-500">Tag:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share */}
          <div>
            <span className="text-sm text-gray-500">Share Item:</span>
            <div className="flex gap-3 mt-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Facebook size={20} />
              </button>
              <button className="text-blue-400 hover:text-blue-600">
                <Twitter size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Tabs Component
const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const selectedVariant = product.variants[0];

  return (
    <div className="border-t border-gray-200">
      <div className="flex border-b border-gray-200">
        {[
          { key: 'description', label: 'Descriptions' },
          { key: 'info', label: 'Additional Information' },
          { key: 'reviews', label: 'Customer Feedback' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.key
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="mb-6 leading-relaxed text-gray-700">{product.description}</p>

            <div className="mb-6 space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-green-500 rounded-full"></div>
                <span>100 g of fresh vegetables provides.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-green-500 rounded-full"></div>
                <span>Aliquam ac est at augue volutpat elementum.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-green-500 rounded-full"></div>
                <span>Quisque nec enim eget sapien molestie.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 bg-green-500 rounded-full"></div>
                <span>Proin convallis odio volutpat finibus posuere.</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Cras et diam maximus, accumsan sapien sit, sollicitudin velit. Nulla blandit eros non turpis
              lobortis iaculis et ut massa.
            </p>

            {product.certifications && product.certifications.length > 0 && (
              <div className="flex gap-2 mt-6">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}

            <div className="p-6 mt-8 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">🎯</div>
                  <div>
                    <div className="font-semibold">64% Discount</div>
                    <div className="text-sm text-gray-600">Save your 64% money with us</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">🌱</div>
                  <div>
                    <div className="font-semibold">100% Organic</div>
                    <div className="text-sm text-gray-600">100% Organic Vegetables</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Weight:</span>
                <span className="ml-2 text-gray-700">
                  {selectedVariant.weight} {selectedVariant.weightUnit}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Stock:</span>
                <span className="ml-2 text-gray-700">{selectedVariant.stock} units available</span>
              </div>
              {product.harvestDate && (
                <div>
                  <span className="font-medium text-gray-900">Harvest Date:</span>
                  <span className="ml-2 text-gray-700">
                    {product.harvestDate}
                  </span>
                </div>
              )}
              {product.bestBefore && (
                <div>
                  <span className="font-medium text-gray-900">Best Before:</span>
                  <span className="ml-2 text-gray-700">
                    {product.bestBefore.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Organic:</span>
                <span className="ml-2 text-gray-700">{product.isOrganic ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Categories:</span>
                <span className="ml-2 text-gray-700 capitalize">
                  {product.categories.join(', ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Mock Reviews */}
            <div className="space-y-4">
              <div className="pb-4 border-b">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    KW
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 space-x-2">
                      <span className="font-medium">Kristin Watson</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Duis at ullamcorper nulla, eu dictum eros.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-4 border-b">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    JC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 space-x-2">
                      <span className="font-medium">Jane Cooper</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                        <Star size={12} />
                      </div>
                      <span className="text-sm text-gray-500">30 Apr, 2021</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to <span>&apos;bolt&apos;</span>
 or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-4 border-b">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    JJ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 space-x-2">
                      <span className="font-medium">Jacob Jones</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    RE
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 space-x-2">
                      <span className="font-medium">Ralph Edwards</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. <span>Canton&apos;s </span> Choice, Bok Choi, from USA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Related Products Component
const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Products</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <CompactProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};



const ProductDetailPage = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Fetch the specific product
        const productResponse = await axios.get(`${BASE_URL}/api/products/${_id}`);
        setProduct(productResponse.data);
        
        // Fetch related products (you might need to adjust this endpoint)
        const relatedResponse = await axios.get(`${BASE_URL}/api/products/`);
        setRelatedProducts(relatedResponse.data.data);
      } catch (err) {
        setError('Failed to load product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [_id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Product not found</div>;
  }

  const selectedVariant = product.variants[0];
  const discount = selectedVariant.comparedAtPrice
    ? Math.round(((selectedVariant.comparedAtPrice - selectedVariant.price) / selectedVariant.comparedAtPrice) * 100)
    : 0;

  return (
    <div className="pt-24 bg-white">
      {/* Breadcrumb */}
      <Breadcrumb product={product} />
      {/* Back button for mobile */}
      <div className="px-4 py-3 border-b lg:hidden">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>
      </div>

      {/* Main content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <ImageGallery images={product.images} discount={discount} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

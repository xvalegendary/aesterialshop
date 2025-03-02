import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { StoreFeatures } from "@/components/store-features"

export default function Home() {
  const hoodies = [
    {
      id: 1,
      name: "SDFM Classic Black",
      price: 149.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Our signature hoodie in classic black. Made from premium cotton blend for ultimate comfort and style.",
    },
    {
      id: 2,
      name: "SDFM Premium Gray",
      price: 154.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Elevate your casual wear with our premium gray hoodie. Features a soft inner lining and durable exterior.",
    },
    {
      id: 3,
      name: "SDFM Signature Navy",
      price: 159.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Our navy hoodie combines style and functionality. Perfect for those chilly evenings or casual outings.",
    },
    {
      id: 4,
      name: "SDFM Limited Edition",
      price: 199.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Be unique with our limited edition hoodie. Features exclusive design elements and premium materials.",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <AutoSliderBanner />
      <section id="product-section" className="w-full py-12 md:py-24 bg-dark-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-100">Latest Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hoodies.map((hoodie) => (
              <HoodieCard key={hoodie.id} {...hoodie} />
            ))}
          </div>
        </div>
      </section>
      <StoreFeatures />
    </main>
  )
}


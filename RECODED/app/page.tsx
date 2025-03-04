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
    {
      id: 5,
      name: "SDFM Urban Camo",
      price: 169.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Stand out with our urban camo design. Perfect for streetwear enthusiasts looking for something different.",
    },
    {
      id: 6,
      name: "SDFM Vintage Wash",
      price: 164.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description: "Our vintage wash hoodie gives you that perfectly worn-in look and feel from day one.",
    },
    {
      id: 7,
      name: "SDFM Tech Fleece",
      price: 179.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description: "Stay warm without the bulk. Our tech fleece hoodie is lightweight yet incredibly insulating.",
    },
    {
      id: 8,
      name: "SDFM Oversized Fit",
      price: 159.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Embrace the oversized trend with our relaxed fit hoodie. Comfort meets style in this everyday essential.",
    },
    {
      id: 9,
      name: "SDFM Reflective",
      price: 189.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Be seen in the dark with our reflective hoodie. Perfect for evening runs or making a statement at night.",
    },
    {
      id: 10,
      name: "SDFM Heavyweight",
      price: 174.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Our heavyweight hoodie is built to last. Premium materials and construction for the ultimate in durability.",
    },
    {
      id: 11,
      name: "SDFM Minimalist",
      price: 149.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description: "Less is more with our minimalist design. Clean lines and subtle branding for a sophisticated look.",
    },
    {
      id: 12,
      name: "SDFM Graphic Print",
      price: 164.99,
      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
      description:
        "Make a statement with our graphic print hoodie. Bold designs that capture attention and express your style.",
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


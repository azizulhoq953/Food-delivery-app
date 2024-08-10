import Right from "../../components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
        Natural food<br />
         is always<br />
         good for&nbsp;
          <span className=" text-green-500">
            Health
          </span>
        </h1>
           
        <p className="my-6 text-gray-500 text-sm">
        Natural food is minimally processed, free from additives, emphasizing fresh ingredients for optimal health and sustainability.        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-green-500 uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block rounded-2xl">
        {/* <Image src={'/fruits.gif'} layout={'fill'} objectFit={'contain'} alt={'pizza'} className=" flex rounded-full"/> */}
        <Image
  src="/fruits.gif"
  alt="Fruits"
  fill // Use fill instead of layout="fill"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust based on your layout
  // style={{ objectFit: 'cover' }} 
  style={{ width: 'auto', height: 'auto' }}
/>
      </div>
    </section>
  );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';


function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  SwiperCore.use([Navigation]);
  // console.log(rentListing);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/listing/gets?offer=true&limit=4');
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListing = async () => {
      try {
        const res = await fetch('/api/listing/gets?type=rent&limit=4');
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListing = async () => {
      try {
        const res = await fetch('/api/listing/gets?type=sale&limit=4');
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
    
  }, []);
  console.log(saleListing)
  return (
    <>
      <div>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
            Find Your Next <span className='text-slate-500'>Perfect</span>
            <br />
            Place With Ease...
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
            Rushi Estate is the best place to find your next perfect place to live.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link to={'/search'} className='text-blue-800 text-xs sm:text-sm font-bold hover:underline'>
            Let's Start now...
          </Link>
          <p>helo</p>
        </div>
        <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <p>helo</p>
      </div>
    </>
  );
}

export default Home;

import { useLocation } from 'react-router-dom';

const Resrvation = () => {
  const location = useLocation();
  const roomsData = location.state ? location.state.roomsData : [];
  // console.log("DAtaaa", roomsData);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">
        Available Rooms ({roomsData.length})
      </h1>
      <div className="w-full overflow-x-auto flex flex-wrap">
        {roomsData.map((item) => {
          const imageUrls = item.image_urls && JSON.parse(item.image_urls);
          const firstImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : '';
          return (
            <div key={item.room_id} className="lg:w-1/4 md:w-1/2 w-full p-4">
              <div className="w-full bg-white md:h-[420px] border rounded-lg overflow-hidden border-slate-200">
                <img
                  src={firstImageUrl}
                  alt={item.room_type}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4 flex flex-col justify-around items-center h-[54%]">
                  <p className="text-lg font-semiboldself-start">{item.room_type}</p>
                  <p className="text-sm text-gray-400 font-light">{item.description}</p>
                  <p className="text-md self-end justify-self-end text-gray-500">${item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resrvation;

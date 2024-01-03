import { Instagram } from '@mui/icons-material';
import posts from './Db';
const SocialPost = () => {


  return (
    <div className="flex justify-center flex-col items-center h-auto w-auto p-5 pt-10 pb-10">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <p className="text-md md:text-lg">SOCIAL MEDIA</p>
        <h1 className=' text-lg lg:text-3xl font-semibold tracking-wider ' >CATCH UP WITH OUR LATEST
          <span className="block">AND</span>
          <span className="block">
            EXCLUSIVE EVENTS</span></h1>

      </div>
      <div className=" flex  justify-center items-center p-2 md:p-5  flex-wrap  bg-[#E5E1DA] gap-5">
        {posts.map((post,) => (
          <div key={post.id} className="shadow-md w-[97%] sm:w-[45%] xl:w-[14%] lg:w-[31%] bg-white border border-gray-300 rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt="Post Image" className=" w-full  object-cover" />
            <div className="border-t border-gray-300 p-5 flex items-center flex-col">
              <p className="text-gray-700 text-sm mb-2">{post.description}</p>

              <div className="self-end justify-end ">
                <a
                  href={post.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram
                    style={{
                      fontSize: 35,
                      color: '#FFF',
                      transition: 'color 0.2s',
                      cursor: 'pointer',
                    }}
                    className=" bg-gradient-to-tr from-[#FEC401] via-[#FE1954] to-[#D502C3] p-1 rounded-xl hover:border cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialPost;

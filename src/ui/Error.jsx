import { useNavigate } from "react-router";

function Error({ message = "404 | Page Not Found", onRetry }) {
  const navigate = useNavigate();

  function handleClick() {
    onRetry?.();
    navigate("/");
  }

  return (
    <div className="relative h-dvh w-full">
      <video
        autoPlay
        loop
        muted
        className="h-dvh w-full overflow-hidden object-cover"
      >
        <source src="/assets/videos/error.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-20 bg-gray-950/90 select-none">
        <h1 className="max-w-5xl text-center text-3xl font-bold text-gray-500 md:text-9xl">
          {message}
        </h1>
        <button
          className="pointer z-30 block cursor-pointer rounded-sm bg-gray-600 px-8 py-4 text-white/60"
          onClick={handleClick}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default Error;

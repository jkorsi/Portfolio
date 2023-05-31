import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="my-32">Home Sweet Home</h1>

      <div className="flex items-center justify-center max-lg:grid max-lg:ml-auto max-lg:mr-auto">
        <button
          className="bg-slate-300 hover:bg-slate-200 p-4 border-4 border-slate-700"
          onClick={() => setCount((count) => count + 1)}
        >
          <div>Increase Count</div>
        </button>

        <div className="p-4 my-10 mx-10 bg-slate-200 rounded-lg">
          Count: {count}
        </div>
      </div>
    </div>
  );
};

export default Home;

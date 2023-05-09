import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Home Sweet Home</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          <div>Lisää lukua</div>
        </button>

        <p>Luku on: {count}</p>
      </div>
    </div>
  );
};

export default Home;

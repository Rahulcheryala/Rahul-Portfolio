import { Dock, Navbar, Welcome } from "@components";
import { Terminal } from "@windows";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
};

export default Home;

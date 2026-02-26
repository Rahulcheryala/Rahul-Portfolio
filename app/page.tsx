import { Dock, Navbar, Welcome } from "@components";
import LazyResume from "@components/LazyResume";
import { Terminal, Safari } from "@windows";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <LazyResume />
    </main>
  );
};

export default Home;

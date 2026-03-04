import { Dock, Navbar, Welcome, Home } from "@components";
import ConditionalResume from "@components/ConditionalResume";
import {
  Terminal,
  Safari,
  Finder,
  TxtFile,
  ImgFile,
  Contact,
  Photos,
} from "@windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />

      <Finder />
      <Safari />
      <Photos />
      <Terminal />
      <TxtFile />
      <ImgFile />
      <ConditionalResume />
      <Contact />
    </main>
  );
};

export default App;

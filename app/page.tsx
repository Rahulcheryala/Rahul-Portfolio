import { Dock, Navbar, Welcome, Home } from "@components";
import ConditionalResume from "@components/ConditionalResume";
import LoadingScreen from "@components/LoadingScreen";
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
    <LoadingScreen>
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
    </LoadingScreen>
  );
};

export default App;

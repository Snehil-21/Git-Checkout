import "./App.css";
import Repos from "./components/Repos";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import About from "./components/About";

function App() {
  const [username, setUserName] = useState("");

  const [fullName, setFullName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [location, setLocation] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1%",
        }}
      >
        <SearchBar username={username} setUserName={setUserName} />
        <h2 style={{ color: "darkslategray" }}>Git Lookup</h2>
        {fullName.length > 0 && (
          <About
            fullName={fullName}
            profileUrl={profileUrl}
            location={location}
            twitterUrl={twitterUrl}
          />
        )}
      </div>
      <Repos
        username={username}
        setFullName={setFullName}
        setProfileUrl={setProfileUrl}
        setLocation={setLocation}
        setTwitterUrl={setTwitterUrl}
      />
    </div>
  );
}

export default App;

import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:3001')


const  App = () => {
  return (
      <div className="App">
        <BrowserRouter>
          <Router socket={socket}/>
        </BrowserRouter>
      </div>
  );
}

export default App;

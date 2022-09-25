import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourites';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
<>
{/* <Navbar/>
<Banner/>
<List/> */}
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<List/>}></Route>
  <Route path="/fav" element={<Favourites/>}></Route>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;

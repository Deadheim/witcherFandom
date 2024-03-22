import './App.css'
import {Route, Routes} from "react-router-dom";
import Characters from "./pages/characters/Characters.tsx";

import Home from "./pages/home/Home.tsx";
import Bestiary from "./pages/bestiary/Bestiary.tsx";
import Locations from "./pages/locations/Locations.tsx";
import Equipments from "./pages/equipments/Equipments.tsx";
import Builds from "./pages/builds/Builds.tsx";
import About from "./pages/about/About.tsx";
import AEnvironment from "./admin/adminPages/AEnvironment.tsx";
import AEquipments from "./admin/adminPages/AEquipments.tsx";
import ABuilds from "./admin/adminPages/ABuilds.tsx";
import Authorization from "./pages/auth/Authorization.tsx";
import Admin from "./admin/Admin.tsx";


function App() {

  return (
    <div className="page">

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/characters" element={<Characters />}/>
            <Route path="/bestiary" element={<Bestiary />}/>
            <Route path="/locations" element={<Locations />}/>
            <Route path="/equipments" element={<Equipments />}/>
            <Route path="/builds" element={<Builds />}/>
            <Route path="/about" element={<About />}/>


            <Route path="/admin" element={<Authorization />} />
            <Route path="/adminPanel" element={<Admin />} />
            <Route path="/admin/environments" element={<AEnvironment />}/>
            <Route path="/admin/equipments" element={<AEquipments />}/>
            <Route path="/admin/builds" element={<ABuilds />}/>
        </Routes>
    </div>

  )
}

export default App


import '../../App.css'
import Header from "../../components/Header.tsx";
import Main from "../../components/Main.tsx";
import Footer from "../../components/Footer.tsx";
const Home = () => {
    return (
        <div className="page">
            <Header navBar={['characters', 'bestiary', 'locations', 'equipments', 'builds']}/>
            <Main />
            <Footer />
        </div>
    );
};

export default Home;
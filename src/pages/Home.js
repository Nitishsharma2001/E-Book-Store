import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar.js";
import ProductList from "../features/product list/components/product list.js";
import Footer from "../features/common/foooter.js";

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default Home;
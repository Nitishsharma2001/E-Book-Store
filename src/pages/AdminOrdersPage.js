import AdminOrders from "../features/admin/components/AdminOrders.js";
import AdminProductList from "../features/admin/components/AdminProductList.js";
import NavBar from "../features/navbar/Navbar.js";

function AdminOrdersPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
     );
}

export default AdminOrdersPage;
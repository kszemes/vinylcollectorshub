import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/UserContext.jsx";
import {VinylsForSale} from "./pages/VinylsForSale.jsx";
import {Details} from "./components/Details.jsx";
import {AddEditItem} from "./components/AddEditItem.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {About} from "./pages/About.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {PasswordReset} from "./pages/PasswordReset.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {ConfirmProvider} from "material-ui-confirm";
import {Profile} from "./pages/Profile.jsx";
import {MyCollection} from "./pages/MyCollection.jsx";
import {FormatProvider} from "./context/FormatProvider.jsx";
import {GenreProvider} from "./context/GenreProvider.jsx";
import {StyleProvider} from "./context/StyleProvider.jsx";
import {CountryProvider} from "./context/CountryProvider.jsx";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <CountryProvider>
                    <StyleProvider>
                        <GenreProvider>
                            <FormatProvider>
                                <ConfirmProvider>
                                    <div className='app'>
                                        <Navbar/>
                                        <Routes>
                                            <Route path='/' element={<VinylsForSale/>}/>
                                            <Route path='/about' element={<About/>}/>
                                            <Route path='/create' element={<AddEditItem/>}/>
                                            <Route path='/mycollection' element={<MyCollection/>}/>
                                            <Route path='/signin' element={<SignIn/>}/>
                                            <Route path='/signup' element={<SignUp/>}/>
                                            <Route path='/pwreset' element={<PasswordReset/>}/>
                                            <Route path='/profile' element={<Profile/>}/>
                                            <Route path='*' element={<NotFound/>}/>
                                        </Routes>
                                    </div>
                                </ConfirmProvider>
                            </FormatProvider>
                        </GenreProvider>
                    </StyleProvider>
                </CountryProvider>
            </UserProvider>
        </BrowserRouter>
    )
}

export default App
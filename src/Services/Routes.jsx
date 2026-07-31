import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Home/Layout';
import Home from '../Home/Home';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
     
    )
}
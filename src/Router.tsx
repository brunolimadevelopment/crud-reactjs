import { Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed';
import CreateClient from './pages/CreateClient';
import UpdateClient from './pages/UpdateClient';
import SingleClient from './pages/SingleClient';

export function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/createClient" element={<CreateClient />} />
                <Route path="/updateClient/:id" element={<UpdateClient />} />
                <Route path="/client/:id" element={<SingleClient />} />
            </Routes>
        </div>
    )
}
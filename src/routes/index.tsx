import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<h1>Página inicial</h1>} />

            <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>
    );
}
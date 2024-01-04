import { Suspense, lazy, useEffect } from 'react';
import './App.scss';
import { useAppContext } from './context/app-context/app-context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import VStack from './components/common/vstack/vstack';
import './App.scss';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomerDbSelection from 'components/customer-db-selection';

const LoginPage = lazy(() => import('./pages/login'));
const HomePage = lazy(() => import('./pages/home'));
const CeyizPage = lazy(() => import('./pages/ceyiz'));
const MemoryPage = lazy(() => import('./pages/memory'));

const Logout = () => {
    const { updateUser } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        updateUser(null);
        localStorage.removeItem('token');
        navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div />;
};

function App() {
    const { user, updateUser, customerDb, updateCustomerDb } = useAppContext();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const full_name = localStorage.getItem('full_name');
        const dbName = localStorage.getItem('db_name');

        if (token) {
            updateUser({ token, full_name });
        }

        if (dbName) {
            updateCustomerDb(dbName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Suspense fallback={''}>
            {user ? (
                <VStack className='AppMain'>
                    <Menu />
                    <div className='AppMain_content'>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/ceyiz' element={<CeyizPage />} />
                            <Route path='/anılar' element={<MemoryPage />} />
                            <Route path='/cikis' element={<Logout />} />
                        </Routes>
                    </div>
                    <Footer />
                </VStack>
            ) : customerDb ? (
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path='/' element={<CustomerDbSelection />} />
                </Routes>
            )}
        </Suspense>
    );
}

export default App;

import { UserProvider } from './AuthProvider';
import { DashProvider } from './DashProvider';

const AppProvider = ({ children }) => (
    <>
        <UserProvider>
            <DashProvider>
                { children }
            </DashProvider>
        </UserProvider>
    </>
);

export default AppProvider;
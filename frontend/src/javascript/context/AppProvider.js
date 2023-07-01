import { UserProvider } from './AuthProvider';

const AppProvider = ({ children }) => (
    <>
        <UserProvider>{ children }</UserProvider>
    </>
);

export default AppProvider;
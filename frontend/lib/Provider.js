'use client';

import { Provider } from 'react-redux';
import { store } from './store';

const ProviderWithStore = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default ProviderWithStore;
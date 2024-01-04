import { Button } from '@mui/material';
import Input from 'components/common/input/input';
import VStack from 'components/common/vstack/vstack';
import { backendUrl } from 'helpers/process_env';
import useHandleError from 'helpers/use-handle-error';
import useHttp from 'helpers/use-http';
import React, { useState } from 'react';
import styles from './customer.module.scss';
import { useAppContext } from 'context/app-context/app-context';

const CustomerDbSelection = () => {
    const [dbName, setDbName] = useState('');

    const handleError = useHandleError();
    const sendRequest = useHttp();
    const { updateCustomerDb } = useAppContext();

    const handleSubmit = async () => {
        try {
            const res = await sendRequest(backendUrl + '/api/customer', 'GET', { db_name: dbName });
            updateCustomerDb(res.customerDb.db_name);
        } catch (error) {
            handleError({ message: error.message });
        }
    };

    return (
        <div className={styles.wrapper}>
            <VStack className={styles.vstack}>
                <Input value={dbName} onChange={e => setDbName(e.target.value)} />
                <Button onClick={handleSubmit}>İlerle</Button>
            </VStack>
        </div>
    );
};

export default CustomerDbSelection;

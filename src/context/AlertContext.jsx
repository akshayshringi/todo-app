import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AlertContext = createContext();

/**
 * encapsulates all the child component so that messages can be triggered all over the project
 * 
 * @method AlertProvider
 * @param {*} param0 
 * @returns 
 */
export const AlertProvider = ({ children}) => {

    const [alterType, setAlertType] = useState({
        type: "",
        message: ""
    });

    /**
     * @method handleAlert
     * @param {*} type 
     * @param {*} message 
     */
    function handleAlert(type, message){
        setAlertType((prevState) => {
            return {
                ...prevState,
                type: type,
                message: message
            }
        });

        setTimeout(() => {
            setAlertType((prevState) => {
                return {
                    ...prevState,
                    type: '',
                    message: ''
                }
            });
        }, 5000)
    }

    return (
       <AlertContext.Provider value={{ alterType, handleAlert }}>
            <div className='p-4'>
                <div className={`alert alert-${alterType.type} alert-dismissible fade show`} role="alert" style={{display: `${alterType.type ? 'block': 'none'}`}}>
                    <strong>{alterType.type === 'danger' ? 'Error' : alterType.type} !</strong> {alterType.message}
                </div>    
            </div>
            {children}
       </AlertContext.Provider>  
    )
}
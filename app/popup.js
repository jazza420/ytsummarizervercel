import React, { useState } from 'react';
import popupstyles from './popup.module.css'; // Import your CSS file
import { Button } from "@/components/ui/button"

export default function Popup({ title, message, onClose, buttons }) {
    // const [isVisible, setIsVisible] = useState(true);

    // const showPopup = () => setIsVisible(true);
    // const closePopup = () => setIsVisible(false);
    const buttonElements = [];
    if(buttons)
        buttons.forEach((item, index) => {
            buttonElements.push(<Button style={{marginLeft:"8px"}}key={index} onClick={item[1]} >{item[0]}</Button>)
        })
    //className={popupstyles.popupbutton}
    return (
        <div>
            {/* <button onClick={showPopup}>Show Popup</button> */}


                <div className={popupstyles.popup}>
                    <div className={popupstyles.popupcontent}>
                        <span className={popupstyles.closebutton} onClick={onClose}>&times;</span>
                        <h2>{title}</h2>
                        <p className='my-2'>{message}</p>
                        <Button  onClick={onClose} >OK</Button>
                        {buttonElements}
                    </div>
                </div>

        </div>
    );
};

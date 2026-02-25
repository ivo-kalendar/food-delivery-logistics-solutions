import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

const Print = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        // content: () => componentRef.current,
        contentRef: componentRef,
    });

    return (
        <div>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} />
            </div>
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
};

export default Print;

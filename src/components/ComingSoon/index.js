import "./index.scss";
import { Messages } from "primereact/messages";
import React, {useRef} from "react";
import { useMountEffect } from 'primereact/hooks';

export default function ComingSoonPage() {

    const msgs = useRef(null);

    useMountEffect(() => {
    if (msgs.current) {
        msgs.current.clear();
        msgs.current.show({ id: '1', sticky: true, severity: 'info', summary: 'Hey there!', detail: 'These resources are coming very soon!!', closable: false });
    }
    }); 
    return (
        <>
            <div className="index-wrapper">
                <div className="content-wrapper">
                    <div>
                        <div className="card flex justify-content-center">
                            <Messages ref={msgs} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
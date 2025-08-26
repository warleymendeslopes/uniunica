'use client'
import {useEffect, useRef} from "react";

export default function Form({formId}: {formId: string}) {
    //Gerar uma referencia unica para o ID do fomulario
    const uniqueIdRef = useRef(
        `hubspotForm-${Math.random().toString(36).substr(2, 9)}`,
    );

    //Inicia o formulario
    const createHubSpotForm = () => {
        if (typeof window !== 'undefined' && window.hbspt && window.hbspt.forms) {
            window.hbspt.forms.create({
                portalId: '47678762',
                formId,
                target: `#${uniqueIdRef.current}`,
            });
        } else {
            console.error('O objeto hbspt não está disponível no momento.');
        }
    };

    useEffect(() => {
        createHubSpotForm()
    }, [uniqueIdRef, formId]);

    return(
        <>
            <div id={uniqueIdRef.current} className="FormHubSpot p-6" />
        </>
    )
}
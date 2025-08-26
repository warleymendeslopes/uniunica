interface Hbspt {
    forms: {
        create: (options: {
            portalId: string;
            formId: string;
            target: string;
            onFormReady?: () => void;
            onFormSubmit?: (form: any) => void;
        }) => void;
    };
}

declare global {
    interface Window {
        hbspt?: Hbspt;
    }
}

export { };

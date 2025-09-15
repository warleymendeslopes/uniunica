import HubSpotForm from "@/components/hubSpot/form";


export default function Home() {
    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-3xl font-bold text-center mb-8">Múltiplos Formulários HubSpot</h1>

            {/* Primeiro formulário */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Formulário de Contato</h2>
                <HubSpotForm formId="07ed6974-53d8-49b1-8d6c-1f30efdb3c06"/>
            </div>

            {/*/!* Segundo formulário (mesmo ID para testar) *!/*/}
            {/*<div className="max-w-2xl mx-auto">*/}
            {/*    <h2 className="text-xl font-semibold mb-4">Formulário de Newsletter</h2>*/}
            {/*    <HubSpotForm formId="07ed6974-53d8-49b1-8d6c-1f30efdb3c06" />*/}
            {/*</div>*/}

            {/*/!* Terceiro formulário (ID diferente se você tiver) *!/*/}
            {/*<div className="max-w-2xl mx-auto">*/}
            {/*    <h2 className="text-xl font-semibold mb-4">Formulário de Demo</h2>*/}
            {/*    <HubSpotForm formId="07ed6974-53d8-49b1-8d6c-1f30efdb3c06" className="FormHubSpot p-8 bg-gray-50 rounded-lg" />*/}
            {/*</div>*/}
        </div>
    )
}

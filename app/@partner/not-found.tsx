export default function NotFound() {
    return (
        <section className="page_404 flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900 font-[Arvo]">
            <div className="container text-center">
                <h1 className="text-[80px] font-poppins">404</h1>
                <div
                    className="four_zero_four_bg h-[400px] bg-center bg-no-repeat flex items-center justify-center"
                    style={{
                        backgroundImage:
                            "url('/output-onlinegiftools.gif')",
                    }}
                >

                </div>

                <div className="contant_box_404 font-poppins">
                    <h3 className="text-2xl font-semibold ">Parece que você está perdido</h3>
                    <p className="">
                        A página que você está procurando não está disponível!
                    </p>

                    <a
                        href="/"
                        className="link_404 inline-block mt-6 bg-yellow-500 hover:bg-yellow-600  px-6 py-3 rounded-md shadow-md text-black font-bold transition"
                    >
                        Voltar ao início
                    </a>
                </div>
            </div>
        </section>
    );
}

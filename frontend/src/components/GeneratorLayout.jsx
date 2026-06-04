function GeneratorLayout({

    children,

    history

}) {

    return (

        <div className="flex gap-6 items-start">

            {/* MAIN CONTENT */}

            <div className="flex-1">

                {children}

            </div>

            {/* HISTORY */}

            <div className="w-80 shrink-0">

                {history}

            </div>

        </div>

    );

}

export default GeneratorLayout;
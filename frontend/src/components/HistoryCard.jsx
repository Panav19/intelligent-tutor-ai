function HistoryCard({

    children,

    onClick

}) {

    return (

        <div

            onClick={onClick}

            className="
                bg-slate-700
                hover:bg-slate-600
                p-3
                rounded-lg
                cursor-pointer
                transition
                duration-200
            "

        >

            {children}

        </div>

    );

}

export default HistoryCard;
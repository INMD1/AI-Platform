interface EmptyProps {
    label:string
}

import Image from "next/image"

export const Empty = () => {
    return(
        <div className="h-full p-20 flex flex-col items-center">
            <div className="relative h-72 w-72">
                <Image alt="Empty"
                fill
                src="/images.png"/>
                
            </div>
            <p className="text-muted-forgroind">없서요? 네! 없서요!</p>
        </div>
    )
}
import Image from "next/image";

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="/image/loding.jpg"/>
            </div>
            <p className="text-sm text-muted-forground">
                생각 생각 생각
            </p>
        </div>
    )
}
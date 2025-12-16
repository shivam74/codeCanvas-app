import { Image } from '@imagekit/react';

const IKImage = ({src,className,w,h,alt})=>{
    return (
        <Image 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        src={src} 
        className={className}
        loading="lazy"
        alt={alt}
        height= {h}
        width= {w}
        ></Image>
    )
}

export default IKImage
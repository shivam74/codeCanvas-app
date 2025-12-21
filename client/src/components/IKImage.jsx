import { Image } from '@imagekit/react';

const IKImage = ({src,className,w,h,alt})=>{
    return (
        <Image 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        src={src} 
        className={className}
        loading="lazy"
        lqip={{active : true, quality : 20}}
        alt={alt}
        height= {h}
        width= {w}
        transformation={[
            {
                width: w,
                height: h
            }
        ]}
        ></Image>
    )
}

export default IKImage
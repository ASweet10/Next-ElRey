import Image from "next/image"
import { toast } from 'react-hot-toast'

export default function EditableImage({link, setLink}) {

    async function handleImageFileChange(e) {
        const files = e.target.files
        if (files.length === 1 ) {
            const data = new FormData
            data.set( 'file', files[0] )
            toast("Uploading...")
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
                //headers: {'Content-Type': 'multipart/form-data'}
            })
            if(response.ok) {
                toast.success('Upload complete!')
            } else {
                toast.error('Upload error!')
            }
            const photoURL = await response.json()
            setLink(photoURL)
        }
    }

    return (
        <>
            { link && (
                <Image src={link} className="rounded-lg" alt="UserProfile" width={250} height={250}/>
            )}
            { !link && (
                <div className="text-white text-lg text-center">
                    No image
                </div>
            )}                            
            <label className="flex w-full">
                <input type="file" className="hidden" onChange={ handleImageFileChange }/>
                <span className="p-2 mt-2 rounded-lg bg-primary cursor-pointer font-semibold">Change Avatar</span>
            </label>
        </>
    )
}
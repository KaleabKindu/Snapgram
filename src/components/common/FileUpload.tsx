import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import Image from 'next/image'
import { Button } from '../ui/button'
type Props = {
    onChange:any,
    imageUrl:string
}

const FileUpload = ({ onChange, imageUrl }: Props) => {
    const [ fileUrl, setFileUrl] = useState(imageUrl)
    const accept = {
        'image/*':['.png', '.jpg', '.jpeg', '.svg']
    }
  return (
<Dropzone accept={accept} onDrop={acceptedFiles => {
    const url = URL.createObjectURL(acceptedFiles[0])
    setFileUrl(url)
    onChange(acceptedFiles)
}}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()} className='flex flex-center flex-col cursor-pointer rounded-xl bg-dark-3 p-5'>
        <input {...getInputProps()} className='cursor-pointer'/>
        {
            fileUrl ? (
                <>
                    <div className='relative file_uploader-img'>
                        <Image className='object-cover rounded-2xl' src={fileUrl} fill alt='file upload' />
                    </div>
                    <p className='file_uploader-label'>Click or Drag and Drop photo to replace</p>
                </>
            ):(
                <div className='file_uploader-box'>
                    <Image src='/assets/icons/file-upload.svg' width={100} height={100} alt='file upload' />
                    <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag and Drop Photo here</h3>
                    <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
                    <Button type='button' className='shad-button_dark_4'>Upload File</Button>
                </div>
              )
        }
      </div>
    </section>
  )}
</Dropzone>
  )
}

export default FileUpload
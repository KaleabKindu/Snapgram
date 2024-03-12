import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";
type Props = {
  onChange: any;
  imageUrl: string;
};

const ProfileUpload = ({ onChange, imageUrl }: Props) => {
  const [fileUrl, setFileUrl] = useState(imageUrl);
  const accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".svg"],
  };
  useEffect(() => {
    setFileUrl(imageUrl);
  }, [imageUrl]);
  return (
    <Dropzone
      accept={accept}
      onDrop={(acceptedFiles) => {
        const url = URL.createObjectURL(acceptedFiles[0]);
        setFileUrl(url);
        onChange(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            {...getRootProps()}
            className="flex flex-col gap-5 cursor-pointer w-fit"
          >
            <input {...getInputProps()} className="cursor-pointer" />
            {fileUrl && (
              <>
                <div className="relative w-44 h-44">
                  <Image
                    className="object-cover rounded-full"
                    src={fileUrl}
                    fill
                    alt="file upload"
                  />
                </div>
                <p className="text-light-4 text-center small-regular">
                  Click to upload image
                </p>
              </>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ProfileUpload;

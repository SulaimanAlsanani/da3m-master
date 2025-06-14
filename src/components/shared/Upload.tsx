import React, { useRef, useState } from "react";

import Image from "next/image";

import { PhotoView } from "react-photo-view";
type UploadImageProps = {
  user?: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  editImgUrl?: string | null;
  rounded?:string | null;
  acceptType?:string
};
const Upload = (props: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // console.log(imageSrc)
  const handleButtonClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    console.log("event", files)
    if (files && files.length > 0) {
      const file = files[0];
      props.setFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept={props.acceptType ? props.acceptType : "image/*"}
      />

      <div className={`flex cursor-pointer  w-[75px] h-[75px] justify-center  items-center relative ${props.rounded? props.rounded:"rounded-[12px]"}   border`}>
        <div
          onClick={handleButtonClick}
          className="flex absolute bg-primary w-10 h-10 rounded-full items-center justify-center end-2 bottom-[-15px]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_426_3265)">
              <path
                d="M5 7H6C6.53043 7 7.03914 6.78929 7.41421 6.41421C7.78929 6.03914 8 5.53043 8 5C8 4.73478 8.10536 4.48043 8.29289 4.29289C8.48043 4.10536 8.73478 4 9 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5C16 5.53043 16.2107 6.03914 16.5858 6.41421C16.9609 6.78929 17.4696 7 18 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 13C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13C15 12.2044 14.6839 11.4413 14.1213 10.8787C13.5587 10.3161 12.7956 10 12 10C11.2044 10 10.4413 10.3161 9.87868 10.8787C9.31607 11.4413 9 12.2044 9 13Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_426_3265">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {imageSrc ? (
          <PhotoView src={imageSrc}>
            <Image
              width={40}
              height={40}
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full rounded-[12px] object-cover"
            />
          </PhotoView>
        ) : props.editImgUrl ? (
          <PhotoView src={props.editImgUrl}>
            <Image
              width={40}
              height={40}
              src={props.editImgUrl}
              alt="Uploaded"
              className="w-full h-full rounded-full object-cover"
            />
          </PhotoView>
        ) : (
          <Image
            onClick={handleButtonClick}
            src="/images/img.svg"
            alt="register"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default Upload;

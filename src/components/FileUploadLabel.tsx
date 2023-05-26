import { ChangeEvent, FC } from "react";
import uploadIcon from "../icons/upload-icon.svg";

type FileUploadLabelProps = {
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
  acceptedFileType: string;
  displayText: string;
};
export const FileUploadLabel: FC<FileUploadLabelProps> = ({
  handleFileInput,
  acceptedFileType,
  displayText,
}) => (
  <label className="flex justify-center w-full h-32 px-10 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
    <span className="flex items-center space-x-2">
      <img src={uploadIcon} alt="Upload Icon" className="nline-block w-7 h-7" />
      <span className="font-medium text-gray-600 select-none">
        {displayText}
      </span>
    </span>
    <input
      type="file"
      accept={acceptedFileType}
      name="file_upload"
      className="hidden"
      onChange={handleFileInput}
    />
  </label>
);

/* eslint-disable react/prop-types */
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({ imageFile, setImageFile, setImageurl }) {
  const inputRef = useRef(null);
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function imageUploadToclaudinary() {
    const data = new FormData();
    data.append("my_file", imageFile);
    const res = await axios.post(
      "http://localhost:3000/api/products//upload-image",
      data,
      { withCredentials: true }
    );
    console.log(res);
    if (res.data.success) {
      setImageurl(res.data.data?.url);
    }
    console.log("kkkkkk");
  }
  useEffect(() => {
    if (imageFile !== null) {
      imageUploadToclaudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4">
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={false}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` flex flex-col items-center justify-center h-32 cursor-pointer`}>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <FileIcon className="w-7 h-7 text-primary m-2" />
            </div>
            <p className="text-sm">{imageFile.name} </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}>
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name:"dny08tnju",
    api_key:"967931747444356",
    api_secret:"4kXoesfEisSWTaSCPsq8Gno4qww"
})

export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "real_estates",
  });
};

export const deleteImage = async (id:string) =>{
 return await cloudinary.uploader.destroy(id);
}

// "use client"

// import { generateImageOutputs } from '@/actions/gemini'
// import { imageUrlToBase64 } from '@/helpers/imgurl-to-base64'
// import { UploadDropzone } from '@/utils/uploadthing'
// import React, { useEffect, useState } from 'react'

// const TestPage = () => {
//     const [output, setOutput] = useState("")
//     const [imagePrompt, setImagePrompt] = useState<string>("")
//     const [uploadedImages, setUploadedImages] = useState<FileList | null>(null)
//     const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")
//     const [imageBase64, setImageBase64] = useState<string | undefined>("")
//     const [imageType, setImageType] = useState<string>("image/png")
//     const Clicked = () => {
//         if(!imageBase64) {
//             console.log("no Image Base 64")
//             return;
//         }
//         generateImageOutputs(imageBase64,imageType,imagePrompt).then((res) => {
//             setOutput(res.text)
//         })
//     }
    
//     useEffect(() => {
//         async function haha(){
//             if(uploadedImageUrl === "") return;
//             setImageBase64(await imageUrlToBase64(uploadedImageUrl))
//         }
//         haha()
        
//     },[uploadedImageUrl])
//   return (
//     <div>
//         <h1>Test Page</h1>
//         {/* <button onClick={Clicked}>Click me</button>
//         <p>{imageBase64}</p>
//         <p>{output}</p> */}
//         {/* <input type="file" multiple={false} id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e) => setUploadedImages(e.target.files)}/> */}
//         {uploadedImageUrl ? (
//             <div>
//                 <img src={uploadedImageUrl} alt=""/>
//             </div>
//         ):(
//             <UploadDropzone 
//             className='bg-foreground/5'
//             endpoint="imageUploader"
//             onClientUploadComplete={(res) => {
//             // Do something with the response
//             console.log("Files: ", res);
//             setUploadedImageUrl(res[0].url)
//             setImageType(res[0].type)
//             alert("Upload Completed");
//             }}
//             onUploadError={(error: Error) => {
//             // Do something with the error.
//             alert(`ERROR! ${error.message}`);
//             }}
//             />
//         )}
//         <input type="text" placeholder='Type..' onChange={(e) => setImagePrompt(e.target.value)}/>
//         <button onClick={Clicked}>Click me</button>
//         <p>{imageBase64}</p>
//         <p>{output}</p>
//         <p>{uploadedImageUrl}</p>

//     </div>
//   )
// }

// export default TestPage
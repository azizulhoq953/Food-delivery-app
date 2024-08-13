// import Image from "next/image";
// import toast from "react-hot-toast";

// export default function EditableImage({link, setLink}) {

//   async function handleFileChange(ev) {
//     const files = ev.target.files;
//     if (files?.length === 1) {
//       const data = new FormData;
//       data.set('file', files[0]);

//       const uploadPromise = fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       }).then(response => {
//         if (response.ok) {
//           return response.json().then(link => {
//             setLink(link);
//           })
//         }
//         throw new Error('Something went wrong');
//       });
//       // const uploadPromise = fetch('https://api.imgbb.com/1/upload?key=72a45176f2f4df55be91c468b60ed9ed', {
//       //   method: 'POST',
//       //   body: data,
//       // }).then(response => {
//       //   if (response.ok) {
//       //     return response.json().then(link => {
//       //       setLink(link);
//       //     })
//       //   }
//       //   throw new Error('Something went wrong');
//       // });

//       await toast.promise(uploadPromise, {
//         loading: 'Uploading...',
//         success: 'Upload complete',
//         error: 'Upload error',
//       });
//     }
//   }

//   return (
//     <>
//       {link && (
//         <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
//       )}
//       {!link && (
//         <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
//           No image
//         </div>
//       )}
//       <label>
//         <input type="file" className="hidden" onChange={handleFileChange} />
//         <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
//       </label>
//     </>
//   );
// }


import Image from "next/image";
import toast from "react-hot-toast";
import { link } from "../../app/api/upload/route";
export default function EditableImage({ link, setLink }) {

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => {
        if (response.ok) {
          return response.json().then(link => {
            setLink(link);
          });
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload error',
      });
    }
  }

  return (
    <>
      {link && (
        <img className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt="avatar" />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}

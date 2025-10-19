
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
  uploadedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onImageUpload(file, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
       <h2 className="text-2xl font-bold text-center mb-1 text-gray-100">Étape 1: Téléchargez Votre Photo</h2>
       <p className="text-gray-400 text-center mb-6">Pour un résultat optimal, utilisez une photo de visage claire et bien éclairée.</p>
       
       <div className="flex flex-col md:flex-row gap-6 items-center">
         <div 
           className={`flex-1 w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${dragOver ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-indigo-600'}`}
           onClick={() => fileInputRef.current?.click()}
           onDragOver={onDragOver}
           onDragLeave={onDragLeave}
           onDrop={onDrop}
         >
           <input
             type="file"
             ref={fileInputRef}
             className="hidden"
             accept="image/png, image/jpeg, image/webp"
             onChange={(e) => handleFileChange(e.target.files)}
           />
           <div className="flex flex-col items-center justify-center space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             <p className="text-gray-400">Glissez-déposez une image ou <span className="font-semibold text-indigo-400">cliquez pour choisir</span></p>
             <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
           </div>
         </div>
         {uploadedImage && (
           <div className="flex-shrink-0">
             <p className="text-center mb-2 font-medium text-gray-300">Votre Photo</p>
             <img src={uploadedImage} alt="Uploaded preview" className="w-40 h-40 object-cover rounded-lg shadow-lg border-2 border-gray-600"/>
           </div>
         )}
       </div>
    </div>
  );
};

export default ImageUploader;

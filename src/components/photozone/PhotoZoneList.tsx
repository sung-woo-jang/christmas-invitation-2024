'use client';
import Image from 'next/image';
import { Photo } from '@/utils/object-storage';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PhotoZonePreviewProps {
  photos: Photo[];
  limit?: number;
}

export default function PhotoZoneList({
  photos,
  limit,
}: PhotoZonePreviewProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);

  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // 실제 삭제 로직을 여기에 구현합니다.
    console.log('Deleting photo:', photoToDelete);
    setIsDeleteModalOpen(false);
    setPhotoToDelete(null);
  };

  return (
    <>
      <div className='grid gap-4 sm:gap-6'>
        {photos?.slice(0, limit).map((photo) => (
          <div
            key={photo.id}
            className='bg-white p-2 sm:p-4 rounded-lg shadow-lg relative'
          >
            <div className='aspect-[3/4] relative'>
              <Image
                src={photo?.base64Url ? photo?.base64Url : '/Christmas.webp'}
                alt={`포토존 ${photo.id}`}
                fill
                className='rounded-lg object-cover'
                sizes='(max-width: 430px) 90vw, (max-width: 768px) 45vw, 30vw'
              />
              <button
                onClick={() => handleDeleteClick(photo)}
                className='absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity'
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사진 삭제 확인</DialogTitle>
            <DialogDescription>
              정말로 이 사진을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </Button>
            <Button variant='destructive' onClick={handleDeleteConfirm}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
